import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  let delay = +formEl.elements.delay.value;
  const step = +formEl.elements.step.value;
  const amount = +formEl.elements.amount.value;
  let position = 1;

  while (position !== amount + 1) {
    processPromises(position, delay);
    delay = delay + step;
    position += 1;
  }
}

function processPromises(position, delay) {
  createPromise(position, delay)
    .then(({ position, delay }) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise ${position} in ${delay}ms`,
      });
    })
    .catch(({ position, delay }) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise ${position} in ${delay}ms`,
      });
    });
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
