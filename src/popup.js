const initial = () => {
  const submitButton = document.getElementById('submit-btn');
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitButton.click();
    }
  });
  submitButton.addEventListener('click', handleSearchClick);
};

const sendScript = (key) => {
  if (key === '' || key === ' ') return;
  const code = `document.addEventListener("keydown",(event) => {
                  if(event.ctrlKey && event.key === "${key}") {
                      setTimeout(function(){debugger;}, 0);
                  }
              });`;
  console.log(key);
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {
      code: code,
    });
  });
};

const handleSearchClick = (e) => {
  e.preventDefault();
  const errorElement = document.getElementById('error');
  const key = document.getElementById('search-query').value;
  errorElement.innerHTML = '';
  if (key.length > 1) {
    errorElement.innerHTML = "The input can't be more than one character :)";
  } else {
    sendScript(key);
  }
};

document.addEventListener('DOMContentLoaded', initial);
