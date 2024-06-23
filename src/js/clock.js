const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');

function setDate() {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

function digitalDate() {
    const now = new Date();

    const sec = now.getSeconds();
    const min = now.getMinutes();
    const hour = now.getHours();

    const second = document.querySelector(".box.sec");
    const minute = document.querySelector(".box.min");
    const hours = document.querySelector(".box.hour");

    second.innerHTML = sec < 10 ? "0" + sec : sec;
    minute.innerHTML = min < 10 ? "0" + min : min;
    hours.innerHTML = hour < 10 ? "0" + hour : hour;


}

digitalDate();
setInterval(digitalDate, 1000);

setInterval(setDate, 1000);

setDate();