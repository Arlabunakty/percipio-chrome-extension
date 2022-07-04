import logger from "./../logging";

function arrayBufferToString(buffer: ArrayBuffer) {
  var bufView = new Uint8Array(buffer);
  var length = bufView.length;
  var result = "";
  var addition = Math.pow(2, 16) - 1;

  for (var i = 0; i < length; i += addition) {
    if (i + addition > length) {
      addition = length - i;
    }
    const typedArray = bufView.subarray(i, i + addition);
    const array = Array.from(typedArray);
    result += String.fromCharCode.apply(null, array);
  }

  return result;
}

export {};

chrome.alarms.create("keep-alive", { periodInMinutes: 4.9 });
chrome.alarms.onAlarm.addListener(() => {
  logger.devVerbose("alarm to keep alive");
  chrome.alarms.create("keep-alive", { periodInMinutes: 4.9 });
});

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

const filter = {
  // types: ["xmlhttprequest"],
  urls: [
    //"*://*.percipio.com/*.opf",
    //"*://*.percipio.com/*graphql2?query=contentCompletion-getAudioBookChapters-getAudioBook",
    //"*://*.percipio.com/*graphql2?query=courseQueryWithBadging"
  ],
};

function graphql2(details: any) {
  const urlString = details.url;
  return (
    urlString.indexOf(
      "graphql2?query=contentCompletion-getAudioBookChapters-getAudioBook"
    ) > 0 || urlString.indexOf("graphql2?query=courseQueryWithBadging") > 0
  );
}

chrome.webRequest.onSendHeaders.addListener(
  (details) => {
    // chrome.storage.local.get("enabled")
    logger.devVerbose("Last webRequest URL =", details.url);
    logger.devVerbose("Last webRequest headers =", details.requestHeaders);

    // if (value === false)
    const tabId = details.tabId;
    if (tabId < 0) return;
    var isCaptured = false;
    var message = {};
    if (details.url.endsWith("package.opf")) {
      message = { url: details.url, tabId: tabId };
      isCaptured = true;
    }
    if (graphql2(details)) {
      message = {
        url: details.url,
        tabId: tabId,
        headers: details.requestHeaders,
      };
      isCaptured = true;
    }

    if (isCaptured) {
      logger.devVerbose("message");
      logger.devVerbose(message);
      chrome.storage.local.set({onSendHeaders: message});
      logger.devVerbose("webRequest.onBeforeRequest start");
      logger.devVerbose("Trace webRequest.onBeforeRequest TabId = ", tabId);
      logger.devVerbose("Last webRequest details =", details);
      logger.devVerbose("webRequest.onBeforeRequest done.");
    }
    // chrome.runtime.sendMessage(message);
    // if (!m3u8SniffingEnabled) return;
    //   const tabObj = await updateTallylMaps(tabId, requestM3u8);
    //   if (tabObj) await webPageInsertM3U8(tabId, tabObj, requestM3u8);
  },
  filter,
  ["requestHeaders"]
);

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const tabId = details.tabId;
    if (tabId < 0) return;
    if (graphql2(details)) {
      logger.devVerbose("details.requestBody?.error");
      logger.devVerbose(details.requestBody?.error);
      const bodyBuffer = details.requestBody?.raw;
      if (bodyBuffer) {
        const i: ArrayBuffer | undefined = (bodyBuffer || [])
          .map((e) => e.bytes)
          .filter((e) => e)[0];
        const body: string = arrayBufferToString(i || new ArrayBuffer(0));
        const message = {
          url: details.url,
          tabId: details.tabId,
          body: body,
        };
        logger.devVerbose("onBeforeRequest->message");
        logger.devVerbose(message);
        chrome.storage.local.set({onBeforeRequest: message});
      }
    }
  },
  filter,
  ["requestBody"]
);

// chrome.webNavigation.onBeforeNavigate.addListener((details) => {
//   console.log('wake me up ' + details.tabId + " url " + details.url);
// });
