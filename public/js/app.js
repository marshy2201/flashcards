const hintButton = document.querySelector('#content button');
const hintMessage = document.querySelector('.hint');

const showHint = e => {
  e.target.remove();
  hintMessage.style.display = 'block';
}

hintButton.addEventListener('click', showHint);