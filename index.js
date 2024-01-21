const body = document.body;
const lightmodesvg = document.getElementById("lightmodesvg");
const sidebar = document.querySelector(".sidebar");
window.addEventListener("load", function() {
  const userPreference = localStorage.getItem("darkMode");
  if (userPreference === "dark") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
});
const showsidebar = () => {
  sidebar.classList.toggle("show");
}
const lightmode = () => {
  body.classList.toggle("lightmode");
  body.classList.toggle("transition");

  if (body.classList.contains("lightmode")) {
    lightmodesvg.setAttribute("d", "M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z");
    localStorage.setItem("darkMode", "dark");
  } else {
    lightmodesvg.setAttribute("d", "M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z");
    localStorage.setItem("darkMode", "light");
  }
}
function enableDarkMode() {
  body.classList.add("lightmode");
}
function disableDarkMode() {
  body.classList.remove("lightmode");
}


/*about page text scrumble*/
class TextScramble {
  constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
  }

  setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      this.queue = [];
      for (let i = 0; i < length; i++) {
          const from = oldText[i] || '';
          const to = newText[i] || '';
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
  }

  update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
              complete++;
              output += to;
          } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                  char = this.randomChar();
                  this.queue[i].char = char;
              }
              output += `<span class="dud">${char}</span>`;
          } else {
              output += from;
          }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
          this.resolve();
      } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
      }
  }

  randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const fx = new TextScramble(document.querySelector('.text'));

const phrases = [
  'THORNGDAVID | TD',
  'AS',
  'FRONTEND DEVELOPER',
  'BACKEND DEVELOPER',
  'UI DESIGNER',
  'LEARN MORE ABOUT ME BELOW..'
];

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 2500);
  });
  counter = (counter + 1) % phrases.length;
};

next();

/*icon animate*/
document.addEventListener('DOMContentLoaded', function () {
  const experienceIcons = document.querySelectorAll('.experience-section a img');

  experienceIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.add('jump');
      setTimeout(() => {
        icon.classList.remove('jump');
      }, 300);
    });
  });
});