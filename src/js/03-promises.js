import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  position: 'right-top',
  fontSize: '18px',
  cssAnimationStyle: 'from-right',
  width: '350px',
  cssAnimationDuration: 600,
});

const form = document.querySelector('.form');
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function getPromise(e) {
  e.preventDefault();
  const delay = parseInt(e.target.elements.delay.value);
  const step = parseInt(e.target.elements.step.value);
  const amount = parseInt(e.target.elements.amount.value);

  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay + i * step)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

form.addEventListener('submit', getPromise);