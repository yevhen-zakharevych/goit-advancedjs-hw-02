import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const submitButtonEl = document.querySelector('[type="submit"]');

formEl.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  submitButtonEl.disabled = true;

  let delay = +formEl.elements.delay.value;
  const step = +formEl.elements.step.value;
  const amount = +formEl.elements.amount.value;
  let position = 1;
  const duration = delay + step * amount;

  while (position !== amount + 1) {
    processPromises(position, delay);
    delay = delay + step;
    position += 1;
  }

  setTimeout(() => {
    submitButtonEl.disabled = false;
  }, duration);
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
