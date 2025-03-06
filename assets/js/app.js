'use strict';

const clock = document.getElementById('clock');
const alarmForm = document.getElementById('alarm-form');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const alarmMessage = document.getElementById('alarm-set-message');
const alarmSound = new Audio('./assets/media/alarm.mp3');

let alarmTime = null;
alarmSound.volume = 1.0;

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}`;

    if (alarmTime && `${hours}:${minutes}` === alarmTime) {
        console.log("Alarm ringing!");
        alarmSound.play().catch(error => console.error("Error playing alarm sound:", error));
        alert('Alarm ringing!');

        setTimeout(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0; 
        }, 10000);

        alarmTime = null; 
        alarmMessage.textContent = "";
    }
}

setInterval(updateClock, 1000);

alarmForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const hh = hourInput.value.padStart(2, '0');
    const mm = minuteInput.value.padStart(2, '0');
    
    if (hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59) {
        alarmTime = `${hh}:${mm}`;
        alarmMessage.innerHTML = `<i class="fa-solid fa-bell"></i> Alarm set for ${alarmTime}`;
        alarmMessage.style.color = "#90EE90";

        console.log("Alarm set for:", alarmTime) 
    } else {
        alarmMessage.textContent = 'Invalid time. Please enter HH: 00-23 and MM: 00-59.';
        alarmMessage.style.color = '#FF6666';
    }
});




