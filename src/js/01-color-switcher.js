
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

stopBtn.setAttribute('disabled', '');

startBtn.addEventListener('click', () => {
    startBtn.setAttribute('disabled', '');
    stopBtn.removeAttribute('disabled');
  setRandomBgColor();
  timerId = setInterval(() => {
    setRandomBgColor();
  }, 1000);
});
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled');
  //  document.body.removeAttribute('style');
});

function setRandomBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}