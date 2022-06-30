// logging.js - JS to control console logging and error handling
// (C) 2021 Richard Stam, SigmaFxDx Software
// var stealthRelease = true;
var stealthRelease = false;
var devDebugging = true;
var devVerboseLog = true;
var logRuntimeErrors = true;
var alertRuntimeErrors = true;
var squelchRuntimeErrors = true;
var logRuntimeExceptions = true;
var alertRuntimeExceptions = true;
var squelchRuntimeExceptions = true;

// Check for chrome.runtime.lastError
// export function checkLastError(caller) {
//   var lastError = chrome.runtime.lastError;
//   if (lastError) logRuntimeError("checkLastError = " + lastError.message);
//   return lastError;
// }

// devDubugging = true/false;
export function devLog(...args) {
  if (!stealthRelease) console.log(...args);
}
export function devInfo(...args) {
  if (!stealthRelease) console.info(...args);
}
export function devDebug(...args) {
  if (devDebugging && !stealthRelease) console.info(...args);
}
export function devVerbose(...args) {
  if (devVerboseLog && !stealthRelease) console.debug(...args);
}

//logRuntimeErrors = true/false;
//alertRuntimeErrors = true/false;
export function logRuntimeError(...args) {
  if (!stealthRelease) {
    if (logRuntimeErrors) {
      console.groupCollapsed("ERROR: " + args[0] + " ...");
      console.log(...args);
      console.trace();
      console.groupEnd();
    }
    if (alertRuntimeErrors) alertRuntimeError(...args);
  }
}
export function alertRuntimeError(...args) {
  if (alertRuntimeErrors && !stealthRelease) {
    alert("ERROR: " + args.join(" "));
  }
}

//logRuntimeExceptions = true/false;
//alertRuntimeExceptions = true/false;
export function logRuntimeException(...args) {
  if (!stealthRelease) {
    if (logRuntimeExceptions) {
      console.groupCollapsed("ERROR: (Exception) " + args[0] + " ...");
      console.log(...args);
      console.trace();
      console.groupEnd();
    }
    if (alertRuntimeExceptions) alertRuntimeException(...args);
  }
}
export function alertRuntimeException(...args) {
  if (alertRuntimeExceptions && !stealthRelease) {
    alert("ERROR (Exception): " + args.join(" "));
  }
}

//#region Catch generic runtime errors
// medium.com/@jacobwarduk/
//how-to-correctly-use-preventdefault-stoppropagation
//-or-return-false-on-events-6c4e3f31aedb

// Handles normal (sync) runtime errors
// window.addEventListener("error", function (event) {
//   logRuntimeError("window error event =", event);
//   if (squelchRuntimeErrors || stealthRelease) event.preventDefault();
// });

// // Handles async (Promise) runtime errors (Exceptions)
// window.addEventListener("unhandledrejection", function (event) {
//   logRuntimeException("window unhandledrejection event =", event);
//   if (squelchRuntimeExceptions || stealthRelease) event.preventDefault();
// });
//#endregion

export default {
  devLog: devLog,
  devInfo: devInfo,
  devDebug: devDebug,
  devVerbose: devVerbose,
  logRuntimeError: logRuntimeError,
  alertRuntimeError: alertRuntimeError,
  logRuntimeException: logRuntimeException,
  alertRuntimeException: alertRuntimeException,
};
