let timer = document.getElementById('timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let laps = document.getElementById('laps');

let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let interval = null;
let isRunning = false;

function updateTimerDisplay() {
  timer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    milliseconds += 10;
    if (milliseconds === 1000) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateTimerDisplay();
  }, 10); // Update every 10ms
}

function pauseTimer() {
  clearInterval(interval);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  hours = minutes = seconds = milliseconds = 0;
  updateTimerDisplay();
  laps.innerHTML = '';
}

function recordLap() {
  if (!isRunning) return;
  let lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
  let lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  laps.appendChild(lapItem);
}


startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

updateTimerDisplay();
