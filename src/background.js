/**
 * The code in this file works to inject "default mode" code to the background webpage as soon as it is loaded so that the mode can be used on refreshes or from the get go
 */

// When the background webpage is updated
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // check if the url is a chrome internal url
  if (!tab.url || !tab.url.startsWith('http')) {
    return;
  }

  // code to inject
  const code = `document.addEventListener("keydown",(event) => {
          if(event.ctrlKey && event.key === "\`") {
              debugger;
          }
      });`;
  //   injecting the code in the current webpage
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(tabId, {
      code: code,
    });
  });
});
