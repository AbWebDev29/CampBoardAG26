chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "autofill") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ['content-script.js']
    });
  }
});
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
chrome.runtime.onStartup.addListener(() => {
  console.log("Extension started");
});
chrome.runtime.onSuspend.addListener(() => {
  console.log("Extension suspended");
});
chrome.runtime.onConnect.addListener((port) => {
  console.assert(port.name === "my-port");
  port.onMessage.addListener((msg) => {
    if (msg.action === "getData") {
      chrome.storage.local.get(['myWebsiteData'], function(result) {
        port.postMessage({ data: result.myWebsiteData || {} });
      });
    }
  });
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveData") {
    chrome.storage.local.set({ myWebsiteData: request.data }, () => {
      console.log("Data saved:", request.data);
      sendResponse({ status: "success" });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getData") {
    chrome.storage.local.get(['myWebsiteData'], function(result) {
      sendResponse({ data: result.myWebsiteData || {} });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clearData") {
    chrome.storage.local.remove('myWebsiteData', () => {
      console.log("Data cleared");
      sendResponse({ status: "success" });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getUserData") {
    chrome.storage.local.get(['userData'], function(result) {
      sendResponse({ userData: result.userData || {} });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "saveUserData") {
    chrome.storage.local.set({ userData: request.data }, () => {
      console.log("User data saved:", request.data);
      sendResponse({ status: "success" });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});
// This script runs in the background and listens for messages from the content script or popup
// It can handle actions like saving data, clearing data, and autofilling forms
// It can also listen for installation and startup events
// It can also listen for connection events from other parts of the extension 