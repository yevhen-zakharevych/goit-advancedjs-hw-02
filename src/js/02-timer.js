import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onSelectDate(selectedDates[0]);
  },
};

const datepicker = flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  onStart();
});

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let selectedDate = null;

function onSelectDate(selected) {
  const curDate = new Date();

  if (selected < curDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });

    return;
  }

  startButton.disabled = false;
  selectedDate = selected;
}

function onStart() {
  datepicker.element.disabled = true;
  const curDate = new Date();
  let diff = selectedDate - curDate;
  const convertedData = convertMs(diff);
  updateTimer(convertedData);

  const intervalId = setInterval(() => {
    const convertedData = convertMs(diff);
    updateTimer(convertedData);

    if (diff < 1000) {
      clearInterval(intervalId);
    }

    diff -= 1000;
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
