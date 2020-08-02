const visitInfoPage = (e) => {
  e.preventDefault();
  const url = `https://www.w3schools.com/jsref/jsref_debugger.asp`;
  chrome.tabs.create({ url: url });
};

const initial = () => {
  const submitButton = document.getElementById('submit-btn');
  const infoLink = document.getElementById('info');
  infoLink.addEventListener('click', visitInfoPage);
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitButton.click();
    }
  });
  submitButton.addEventListener('click', handleSearchClick);
};

const sendScript = (key, timeout) => {
  if (key === '' || key === ' ') return;
  const code = `document.addEventListener("keydown",(event) => {
                  if(event.ctrlKey && event.key === "${key}") {
                      setTimeout(function(){debugger;},${timeout * 1000});
                  }
              });`;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {
      code: code,
    });
  });
};

const handleSearchClick = (e) => {
  e.preventDefault();
  const errorElement = document.getElementById('error');
  const key = document.getElementById('key-macro').value;
  const timeout = Number(document.getElementById('timeout').value);
  errorElement.innerHTML = '';
  if (key.length > 1) {
    errorElement.innerHTML = "The input can't be more than one character :)";
  } else {
    sendScript(key, timeout);
  }
};

document.addEventListener('DOMContentLoaded', initial);
