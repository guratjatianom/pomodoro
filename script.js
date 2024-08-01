// script.js
let timer;
let isRunning = false;
let isPaused = false;
let time = 25 * 60;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const shortBreakButton = document.getElementById('short-break');
const longBreakButton = document.getElementById('long-break');
const notificationSound = document.getElementById('notification-sound'); // Elemen audio

function updateTimer() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
    secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function notify(message) {
    if (Notification.permission === 'granted') {
        new Notification(message);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
    notificationSound.play(); // Mainkan suara notifikasi
}

function startTimer() {
    if (isRunning && !isPaused) return;
    isRunning = true;
    isPaused = false;
    timer = setInterval(() => {
        if (time > 0) {
            time--;
            updateTimer();
        } else {
            clearInterval(timer);
            isRunning = false;
            notify('Pomodoro selesai!');
        }
    }, 1000);
}

function pauseTimer() {
    if (!isRunning || isPaused) return;
    isPaused = true;
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    time = 25 * 60;
    updateTimer();
}

function shortBreak() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    time = 5 * 60;
    updateTimer();
    startTimer();
}

function longBreak() {
    clearInterval(timer);
    isRunning = false;
    isPaused = false;
    time = 15 * 60;
    updateTimer();
    startTimer();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
shortBreakButton.addEventListener('click', shortBreak);
longBreakButton.addEventListener('click', longBreak);

updateTimer();
