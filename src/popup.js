const initial = () => {
  const submitButton = document.getElementById('submit-btn');
  document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitButton.click();
    }
  });
  submitButton.addEventListener('click', handleSearchClick);
};

const handleSearchClick = (e) => {
  e.preventDefault();
  const errorElement = document.getElementById('error');
  const key = document.getElementById('search-query').value;
  errorElement.innerHTML = '';
  if (key.length !== 1) {
    errorElement.innerHTML = 'The input should be only a single character :)';
  }
  console.log(key);
};

document.addEventListener('DOMContentLoaded', initial);
