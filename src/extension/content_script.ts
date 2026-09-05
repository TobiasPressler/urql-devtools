import { ExchangeMessage, ExchangeSource } from "@urql/devtools";
import { ContentScriptConnectionName } from "../types";
import { debug } from "../util";

/** Connection to background.js */
let connection: chrome.runtime.Port | undefined;

/** Buffer messages while reconnecting */
let pendingMessages: ExchangeMessage[] = [];

/** Connect (or reconnect) to the background script. */
const connect = () => {
  if (connection) return connection;

  debug("Connecting to background");
  connection = chrome.runtime.connect({ name: ContentScriptConnectionName });
  connection.onMessage.addListener(handleMessage);
  connection.onDisconnect.addListener(handleDisconnect);

  // Flush any buffered messages
  while (pendingMessages.length > 0) {
    const msg = pendingMessages.shift()!;
    connection.postMessage(msg);
  }

  return connection;
};

// Listen for init message from exchange
window.addEventListener("message", ({ data, isTrusted }) => {
  const exchangeSource: ExchangeSource = "exchange";

  // Filter messages not from the exchange
  if (!isTrusted || data?.source !== exchangeSource) {
    return;
  }

  const message = data as ExchangeMessage;
  debug("Exchange Message: ", data);

  // Setup connection on init message
  if (message.type === "connection-init") {
    connect();
  }

  if (connection === undefined) {
    // Buffer the message and attempt connection
    pendingMessages.push(message);
    connect();
    return;
  }

  // Forward message to devtools
  connection.postMessage(message);
});

/** Handle message from background script. */
const handleMessage = (message: ExchangeMessage) => {
  debug("Background Message: ", message);
  window.postMessage(message, window.location.origin);
};

/** Handle disconnect from background script (MV3 service worker idle). */
const handleDisconnect = () => {
  debug("Disconnected from background, reconnecting immediately");
  connection = undefined;
  connect();
};
