import { ExchangeMessage, ExchangeSource } from "@urql/devtools";
import { ContentScriptConnectionName } from "../types";
import { debug } from "../util";

/** Connection to background.js */
let connection: chrome.runtime.Port | undefined;

/** Buffer messages while reconnecting */
const pendingMessages: ExchangeMessage[] = [];

/**
 * Send a message to the background script, buffering it (and reconnecting)
 * if there's no live connection, or if sending throws because the
 * extension context has been invalidated in the meantime.
 */
const postMessage = (message: ExchangeMessage) => {
  if (!connection) {
    pendingMessages.push(message);
    connect();
    return;
  }

  try {
    connection.postMessage(message);
  } catch {
    debug("Extension context invalidated, buffering message");
    connection = undefined;
    pendingMessages.push(message);
  }
};

/** Connect (or reconnect) to the background script. */
const connect = () => {
  if (connection) return connection;

  // chrome.runtime — and any call made through it — becomes unusable once
  // the extension is reloaded/updated while this content script is still
  // injected into an existing page. Depending on the Chrome version this
  // shows up as `chrome.runtime` being undefined, or as `chrome.runtime.*`
  // calls throwing "Extension context invalidated". Either way there's no
  // recovery short of the page being refreshed.
  if (typeof chrome === "undefined" || !chrome.runtime) {
    debug("Extension context invalidated, cannot connect to background");
    return undefined;
  }

  try {
    debug("Connecting to background");
    connection = chrome.runtime.connect({
      name: ContentScriptConnectionName,
    });
    connection.onMessage.addListener(handleMessage);
    connection.onDisconnect.addListener(handleDisconnect);
  } catch {
    debug("Extension context invalidated, cannot connect to background");
    connection = undefined;
    return undefined;
  }

  // Flush any buffered messages
  while (pendingMessages.length > 0) {
    postMessage(pendingMessages.shift()!);
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

  postMessage(message);
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
