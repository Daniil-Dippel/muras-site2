const yearDisplay = document.getElementById("year-display");
const slider = document.getElementById("year-slider");
const info = document.getElementById("info");
const body = document.body;
const particlesContainer = document.getElementById("particles");

// 🗂 Исторические события кыргызов
const events = new Map([
  [-300, "Первые упоминания о племенах кыргызов в хрониках Китая."],
  [840, "Создание Енисейского Кыргызского каганата."],
  [1510, "Начало объединения кыргызских племён."],
  [1876, "Присоединение к Российской империи."],
  [1991, "Кыргызстан стал независимым государством."],
  [2025, "Современность: сохранение культуры в цифровом пространстве через проект Muras."]
]);

function getEra(year) {
  if (year <= 0) return "ancient";
  if (year <= 1500) return "early";
  if (year <= 1900) return "middle";
  return "modern";
}

function updateBackground(era) {
  const gradients = {
    ancient: "linear-gradient(to bottom, #3a2c1a, #1e1409)",
    early: "linear-gradient(to bottom, #6b4025, #472e1b)",
    middle: "linear-gradient(to bottom, #8b4e36, #5c2d1f)",
    modern: "linear-gradient(to bottom, #3b1d13, #2a1912)"
  };
  body.style.background = gradients[era] || gradients["modern"];
}

let lastYear = parseInt(slider.value);
let particleSpeed = 0.3;
let direction = -1;
const particles = [];

function updateParticlesSpeed(speedFactor) {
  particleSpeed = speedFactor;
}

function updateParticlesDirection(diff) {
  direction = diff > 0 ? -1 : 1;
}

function updateParticlesPosition() {
  for (const p of particles) {
    p.y += p.speed * particleSpeed * direction;
    if (p.y < -10) p.y = window.innerHeight + 10;
    if (p.y > window.innerHeight + 10) p.y = -10;
    p.el.style.transform = `translateY(${p.y}px)`;
  }
  requestAnimationFrame(updateParticlesPosition);
}

function createParticles(num) {
  for (let i = 0; i < num; i++) {
    const el = document.createElement("div");
    el.className = "particle";
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 3 + 2;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    particlesContainer.appendChild(el);
    particles.push({ el, x, y, speed: Math.random() * 0.5 + 0.2 });
  }
}

function updatePage(year) {
  yearDisplay.textContent = year < 0 ? `${-year} г. до н.э.` : `${year} год`;

  const event = events.get(year);
  if (event) {
    info.textContent = `${year < 0 ? `${-year} г. до н.э.` : `${year} год`}: ${event}`;
  } else {
    info.textContent = `Информация о ${year < 0 ? `${-year} г. до н.э.` : `${year} годе`} скоро появится.`;
  }

  const era = getEra(year);
  updateBackground(era);
  info.style.animation = "fadeIn 1s ease-in-out";
}

slider.addEventListener("input", () => {
  const year = parseInt(slider.value, 10);
  const diff = year - lastYear;
  const speedFactor = Math.min(4, Math.abs(diff) / 10 + 1);

  if (Math.abs(diff) > 3) {
    updateParticlesDirection(diff);
  }

  updatePage(year);
  updateParticlesSpeed(speedFactor);
  lastYear = year;
});

// Инициализация
createParticles(100);
updatePage(parseInt(slider.value));
updateParticlesPosition();