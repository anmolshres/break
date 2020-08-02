chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (!tab.url || !tab.url.startsWith('http')) {
    return;
  }

  const code = `document.addEventListener("keydown",(event) => {
          if(event.ctrlKey && event.key === "\`") {
              debugger;
          }
      });`;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(tabId, {
      code: code,
    });
  });
});
