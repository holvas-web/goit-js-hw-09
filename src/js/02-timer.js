import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/confetti.css');

import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  distance: '100px',
  fontSize: '18px',
  position: 'center-top',
  width: '350px',
  timeout: 3000,
  cssAnimationStyle: 'from-top',
});

const fieldInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
let dateNumber;
btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  position: 'below center',
  clickOpens: true,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate.getTime() < Date.now()) {
      Notify.failure('Please choose a date in the future');

      fieldInput._flatpickr.clear();
    } else {
      dateNumber = selectedDate.getTime();
      btnStart.disabled = false;
    }
  },
};

flatpickr(fieldInput, options);

function remainingDate() {
  return dateNumber - Date.now();
}

function updateTimer(days, hours, minutes, seconds) {
  const content = document.querySelectorAll('.value');
  content[0].textContent = days.toString().padStart(2, '0');
  content[1].textContent = hours.toString().padStart(2, '0');
  content[2].textContent = minutes.toString().padStart(2, '0');
  content[3].textContent = seconds.toString().padStart(2, '0');
}

function onTick() {
  const remainingTime = remainingDate();
  if (remainingTime <= 0) {
    fieldInput.disabled = false;
    btnStart.disabled = true;
    Notify.success('Timer is finished!');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  updateTimer(days, hours, minutes, seconds);

  setTimeout(onTick, 1000);
}

function startTimer() {
  fieldInput.disabled = true;
  btnStart.disabled = true;
  Notify.success('Timer is started!');
  onTick();
}

btnStart.addEventListener('click', startTimer);

function convertMs(milliseconds) {
  const oneSecond = 1000;
  const oneMinute = oneSecond * 60;
  const oneHour = oneMinute * 60;
  const oneDay = oneHour * 24;

  const days = Math.floor(milliseconds / oneDay);
  const hours = Math.floor((milliseconds % oneDay) / oneHour);
  const minutes = Math.floor(((milliseconds % oneDay) % oneHour) / oneMinute);
  const seconds = Math.floor(
    (((milliseconds % oneDay) % oneHour) % oneMinute) / oneSecond
  );

  return { days, hours, minutes, seconds };
}

