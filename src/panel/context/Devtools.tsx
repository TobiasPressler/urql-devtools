import { DevtoolsMessage, ExchangeMessage } from "@urql/devtools";
import semver from "semver";
import {
  createContext,
  useEffect,
  PropsWithChildren,
  useRef,
  useCallback,
  useState,
  useContext,
  FC,
} from "react";
import { createConnection } from "../util";

export interface DevtoolsContextType {
  sendMessage: (message: DevtoolsMessage) => void;
  addMessageHandler: (cb: (message: ExchangeMessage) => void) => () => void;
  client:
    | {
        connected: false;
      }
    | {
        connected: true;
        version: {
          required: string;
          actual: string;
          mismatch: boolean;
        };
      };
}

const REQUIRED_VERSION = "2.0.0";

export const DevtoolsContext = createContext<DevtoolsContextType | undefined>(
  undefined,
);

export const useDevtoolsContext = (): DevtoolsContextType => {
  const context = useContext(DevtoolsContext);
  if (context === undefined) {
    throw new Error(
      "useDevtoolsContext must be used within a DevtoolsProvider",
    );
  }
  return context;
};

const sendInitMessage = (conn: ReturnType<typeof createConnection>) => {
  conn.postMessage({
    type: "connection-init",
    source: "devtools",
    tabId:
      process.env.BUILD_ENV === "extension"
        ? chrome?.devtools?.inspectedWindow?.tabId
        : NaN,
    version: process.env.PKG_VERSION,
  });
};

export const DevtoolsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client, setClient] = useState<DevtoolsContextType["client"]>({
    connected: false,
  });
  const connectionRef = useRef<ReturnType<typeof createConnection> | null>(
    null,
  );
  const messageHandlers = useRef<
    Record<string, (msg: ExchangeMessage) => void>
  >({});

  const initConnection = useCallback(() => {
    try {
      const conn = createConnection();
      connectionRef.current = conn;

      conn.onMessage.addListener((msg: ExchangeMessage | DevtoolsMessage) => {
        if (msg?.source !== "exchange") {
          return;
        }
        Object.values(messageHandlers.current).forEach((h) => h(msg));
      });

      if (process.env.BUILD_ENV === "extension") {
        (conn as chrome.runtime.Port).onDisconnect.addListener(() => {
          connectionRef.current = null;
          setClient({ connected: false });
        });
      }

      sendInitMessage(conn);
      return conn;
    } catch {
      // Extension context invalidated (e.g. reloading the extension while
      // this devtools panel stayed open) — there's no way to recover short
      // of reopening the panel. Leave connectionRef null so callers keep
      // retrying harmlessly instead of crashing.
      connectionRef.current = null;
      return undefined;
    }
  }, []);

  const sendMessage = useCallback<DevtoolsContextType["sendMessage"]>(
    (msg) => {
      try {
        if (!connectionRef.current) {
          initConnection();
        }
        connectionRef.current!.postMessage(msg);
      } catch {
        // Port disconnected — force reconnection on next message
        connectionRef.current = null;
        setClient({ connected: false });
      }
    },
    [initConnection],
  );

  const addMessageHandler = useCallback<
    DevtoolsContextType["addMessageHandler"]
  >((callback) => {
    const i = index++;
    messageHandlers.current[i] = callback;

    return () => {
      delete messageHandlers.current[i];
    };
  }, []);

  // Initial connection
  useEffect(() => {
    initConnection();
  }, [initConnection]);

  // Auto-reconnect when disconnected (MV3 service worker idle timeout)
  useEffect(() => {
    if (client.connected) {
      return;
    }

    // Retry connection-init every 2s until exchange responds
    const timer = setInterval(() => {
      if (!connectionRef.current) {
        initConnection();
        return;
      }

      try {
        sendInitMessage(connectionRef.current);
      } catch {
        // Extension context invalidated after the connection was made —
        // drop it so the next tick retries via initConnection() instead.
        connectionRef.current = null;
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [client.connected, initConnection]);

  // Listen for client connect
  useEffect(() => {
    if (client.connected) {
      return;
    }

    return addMessageHandler((message) => {
      if (
        message.type !== "connection-acknowledge" &&
        message.type !== "connection-init"
      ) {
        return;
      }

      if (message.type === "connection-init" && connectionRef.current) {
        try {
          connectionRef.current.postMessage({
            type: "connection-acknowledge",
            source: "devtools",
            version: process.env.PKG_VERSION,
          });
        } catch {
          // Extension context invalidated — drop the stale connection so
          // the retry timer reconnects via initConnection() instead.
          connectionRef.current = null;
        }
      }

      return setClient({
        connected: true,
        version: {
          required: REQUIRED_VERSION,
          actual: message.version,
          mismatch:
            !semver.valid(message.version) ||
            !semver.satisfies(message.version, `>=${REQUIRED_VERSION}`),
        },
      });
    });
  }, [addMessageHandler, client.connected]);

  // Listen for client disconnect
  useEffect(() => {
    if (!client.connected) {
      return;
    }

    return addMessageHandler((message) => {
      if (message.type !== "connection-disconnect") {
        return;
      }

      setClient({ connected: false });
    });
  }, [addMessageHandler, client.connected]);

  return (
    <DevtoolsContext.Provider
      value={{ sendMessage, addMessageHandler, client }}
    >
      {children}
    </DevtoolsContext.Provider>
  );
};

let index = 0;
