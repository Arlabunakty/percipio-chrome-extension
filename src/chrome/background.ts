import logger from "./../logging";
import Sender from "./../types"

export {};
/** Fired when the extension is first installed,
 *  when the extension is updated to a new version,
 *  and when Chrome is updated to a new version. */
chrome.runtime.onInstalled.addListener((details) => {
  logger.devVerbose("[background.js] onInstalled", details);
});

chrome.runtime.onConnect.addListener((port) => {
  logger.devVerbose("[background.js] onConnect", port);
});

chrome.runtime.onStartup.addListener(() => {
  logger.devVerbose("[background.js] onStartup");
});

/**
 *  Sent to the event page just before it is unloaded.
 *  This gives the extension opportunity to do some clean up.
 *  Note that since the page is unloading,
 *  any asynchronous operations started while handling this event
 *  are not guaranteed to complete.
 *  If more activity for the event page occurs before it gets
 *  unloaded the onSuspendCanceled event will
 *  be sent and the page won't be unloaded. */
chrome.runtime.onSuspend.addListener(() => {
  logger.devVerbose("[background.js] onSuspend");
});

// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   logger.devVerbose("Trace runtime.onMessage");
//   logger.devVerbose("runtime.onMessage =", message);
//   logger.devVerbose("Sender =" + sender);

//   sendResponse("echo " + message.message);

//   return true;
// });

const networkFilters = {
  urls: [
    //"*://*.percipio.com/*"
  ],
};
chrome.webRequest.onBeforeRequest.addListener((details) => {
  // chrome.storage.local.get("enabled")
  logger.devVerbose("Last webRequest URL =", details.url);
  
    // if (value === false)
    const tabId = details.tabId;
    if (tabId < 0) return;
    if (!details.url.endsWith("package.opf")) return;
    logger.devVerbose("webRequest.onBeforeRequest start");
    logger.devVerbose("Trace webRequest.onBeforeRequest TabId = ", tabId);
    logger.devVerbose("Last webRequest details =", details);
    const message = {
      from: Sender.Sender.Background,
      message: {url: details.url, tabId: tabId},
    };
  
    chrome.storage.local.set({url: details.url, tabId: tabId})
    // chrome.runtime.sendMessage(message);

    logger.devVerbose("webRequest.onBeforeRequest done.");

  // if (!m3u8SniffingEnabled) return;
  //   const tabObj = await updateTallylMaps(tabId, requestM3u8);
  //   if (tabObj) await webPageInsertM3U8(tabId, tabObj, requestM3u8);
}, networkFilters);