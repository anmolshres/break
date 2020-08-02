/**
 * The code in this file contains logic to get use input on the custom settings, and injects the "debugger" code into the background when the use input is recieved
 */

/**
 * This function opens a separate tab with information about "debugger" keyword on w3schools
 * @param e event triggered on the href element click
 * @returns void
 */
const visitInfoPage = (e) => {
  e.preventDefault();
  const url = `https://www.w3schools.com/jsref/jsref_debugger.asp`;
  chrome.tabs.create({ url: url });
};

/**
 * This function add the important notices when the button is clicked
 * @param e event triggered on the button click
 * @returns void
 */
const getNoticeInfo = (e) => {
  e.preventDefault();
  const noticePara = document.getElementById('notice-info');
  noticePara.innerHTML = `
        <b>1.</b> The Dev Console must be open on the webpage for this to work
        <br />
        <b>2.</b> The key press events are expected to come from the webpage's
        body so make sure to switch to the context of the webpage by clicking on
        any part of its body before triggering the debugger <br />
        <b>3.</b> The default mode is active by default and needs no explicit
        activation <br />
        <b>4.</b> The default mode can't be overwritten <br />
        <b>5.</b> Custom settings get eliminated as soon as you refresh the
        webpage and don't persist across pages <br />
        <b>6.</b> Any previous settings can't be overwritten unless the webpage
        is refreshed (except the default) <br />
        <b>7.</b> <kbd>SPACE</kbd> key can't be used for the key combos <br />
        <b>8.</b> Negative values in the number input field will be interpreted
        as 0
  `;
};

/**
 * This function adds event listeners to the necessary elements as soon as the popup is loaded
 * @returns void
 */
const initial = () => {
  const submitButton = document.getElementById('submit-btn');
  const infoLink = document.getElementById('info');
  const noticeButton = document.getElementById('notice-btn');
  noticeButton.addEventListener('click', getNoticeInfo);
  infoLink.addEventListener('click', visitInfoPage);
  submitButton.addEventListener('click', handleSearchClick);
  document.addEventListener('keypress', (e) => {
    //if "Enter" key is simulate click on the submit button
    if (e.key === 'Enter') {
      submitButton.click();
    }
  });
};

/**
 * This function injects "debugger" keyword along with the keydown event listeners with the designated timeout
 * @param  key key character the use wants to use in the combo
 * @param  timeout number seconds of timeout
 * @returns void
 */
const sendScript = (key, timeout) => {
  // if empty
  if (key === '' || key === ' ') return;
  // code to inject
  const code = `document.addEventListener("keydown",(event) => {
                  if(event.ctrlKey && event.key === "${key}") {
                      setTimeout(function(){debugger;},${timeout * 1000});
                  }
              });`;
  // injecting the dynamic code generated
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.executeScript(tabs[0].id, {
      code: code,
    });
  });
};

/**
 * This function handles the clicking of the "Click here" button in the popup
 * @param e event triggered when the button is clicked
 * @returns void
 */
const handleSearchClick = (e) => {
  e.preventDefault();
  const errorElement = document.getElementById('error');
  const key = document.getElementById('key-macro').value;
  const timeout = Number(document.getElementById('timeout').value);
  // reset error message text
  errorElement.innerHTML = '';
  // if the key length is more than 1, set error message text
  if (key.length > 1) {
    errorElement.innerHTML = "The input can't be more than one character 😅";
  } else {
    sendScript(key, timeout);
  }
};

// when the popup is loaded
document.addEventListener('DOMContentLoaded', initial);
