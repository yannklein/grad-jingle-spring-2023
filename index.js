// Jingle steps
const STEPS = {
  longTimeAgo: 0, // from play to "Long Time Ago.." intro
  demoday: 4, // from "Long time ago..." to "Demo Day" duration
  rollText: 10, // from demo day to Rolling text duration
  closing: 60 //from text rolling to closing
};
for (const key in STEPS) {
  STEPS[key] = STEPS[key]*1000;
}

// HTML element selection
const playBtn = document.querySelector('#play');
const longTimeAgo = document.querySelector('#long-time-ago');
const demoday = document.querySelector('h1');
const rollText = document.querySelector('#text-roll');
const goodLuck = document.querySelector('#goodluck');

// Song init and functions
const song = new Audio('./media/starwars.mp3');
const startSong = () => song.play();
const stopSong = () => {
  let volume = 1;
  while (volume > 0) {
    song.volume = volume;
    volume -= 0.000001;
  }
};

// Hide/show util functions
const hide = el => el.classList.add('opacity-0', 'invisible');
const show = el => el.classList.remove('opacity-0', 'invisible');

// Steps action functions
const showLongTimeAgo = () => {
  hide(playBtn);
  show(longTimeAgo);
};
const showDemoDay = () => {
  show(demoday);
  demoday.style.transition = `font-size ${STEPS.rollText/2000}s ease-out, opacity 0.3s, visibility 0.3s`;
  demoday.style.fontSize = '120px';
  
};
const showRollingText = () => {
  show(rollText);
  rollText.style.transition = `transform ${STEPS.closing/1000}s linear, opacity 1s, visibility 1s`;
  rollText.style.transform = `translate(-50%, -50%) perspective(130px) rotateX(20deg) translateY(-62%)`
}

// Main jngle function
const initJingle = (event) => {
  event.preventDefault();
  setTimeout(showLongTimeAgo, STEPS.longTimeAgo);
  setTimeout(() => hide(longTimeAgo), STEPS.demoday - 1000)

  setTimeout(startSong, STEPS.demoday);
  setTimeout(stopSong, STEPS.closing);

  setTimeout(showDemoDay, STEPS.demoday);
  setTimeout(() => hide(demoday), STEPS.rollText)

  setTimeout(showRollingText, STEPS.rollText - 1000);
  setTimeout(() => hide(rollText), STEPS.closing);

  setTimeout(() => show(goodLuck), STEPS.closing + 200);
}

// Play button click listener
playBtn.addEventListener("click", initJingle);