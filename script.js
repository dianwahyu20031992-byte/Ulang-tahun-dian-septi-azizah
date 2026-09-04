function goToScreen(screenNumber) {
  // Sembunyikan semua layar
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  // Tampilkan layar yang dituju
  const targetScreen = document.getElementById('screen-' + screenNumber);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Putar musik saat ada interaksi klik
  const music = document.getElementById('bg-music');
  if (music) {
    music.muted = false;
    music.play().then(() => {
      console.log("Musik berhasil diputar!");
    }).catch(err => {
      console.log("Autoplay musik ditahan oleh browser:", err);
    });
  }

  // Jalankan efek ketik ucapan jika masuk layar ke-4
  if (screenNumber === 4) {
    startTypewriter();
  }
}

// Logika Tahan Tombol Hati (Love Meter)
let percent = 0;
let timer = null;

const percentText = document.getElementById('percent');
const emojiText = document.getElementById('emoji');
const heartBtn = document.getElementById('heart-btn');
const nextBtn = document.getElementById('next-to-gallery');

const emojis = ['🤬', '😠', '😐', '😏', '😍', '🥰'];

function startHold() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (percent < 100) {
      percent++;
      if (percentText) percentText.innerText = percent;
      
      if (emojiText) {
        if (percent < 20) emojiText.innerText = emojis[0];
        else if (percent < 40) emojiText.innerText = emojis[1];
        else if (percent < 60) emojiText.innerText = emojis[2];
        else if (percent < 80) emojiText.innerText = emojis[3];
        else emojiText.innerText = emojis[4];
      }
    } else {
      clearInterval(timer);
      if (emojiText) emojiText.innerText = emojis[5];
      if (nextBtn) nextBtn.classList.remove('hidden');
      if (heartBtn) heartBtn.style.pointerEvents = 'none';
    }
  }, 30);
}

function stopHold() {
  if (timer) clearInterval(timer);
}

if (heartBtn) {
  heartBtn.addEventListener('mousedown', startHold);
  heartBtn.addEventListener('mouseup', stopHold);
  heartBtn.addEventListener('mouseleave', stopHold);

  heartBtn.addEventListener('touchstart', (e) => { 
    e.preventDefault(); 
    startHold(); 
  });
  heartBtn.addEventListener('touchend', stopHold);
}

// Popup Galeri Foto
function openPopup(title, text, imgSrc) {
  const pTitle = document.getElementById('popup-title');
  const pText = document.getElementById('popup-text');
  const pImg = document.getElementById('popup-img');
  const pModal = document.getElementById('popup-modal');

  if (pTitle) pTitle.innerText = title;
  if (pText) pText.innerText = text;
  if (pImg) pImg.src = imgSrc;
  if (pModal) pModal.style.display = 'flex';
}

function closePopup() {
  const pModal = document.getElementById('popup-modal');
  if (pModal) pModal.style.display = 'none';
}

// Efek Ketik Otomatis (Fix Spasi & Enter)
const fullText = "Selamat ulang tahun ya sayang.\n\nSemoga hari ini menjadi awal dari banyak kebahagiaan baru. Semoga semua doa dan impianmu satu per satu menjadi kenyataan.\n\nTerima kasih sudah hadir dan menjadi bagian terindah dalam hidupku.\n\nI Love You ❤️";

function startTypewriter() {
  let i = 0;
  const speed = 40;
  const element = document.getElementById('typewriter-text');
  if (!element) return;
  element.innerHTML = "";

  function type() {
    if (i < fullText.length) {
      let char = fullText.charAt(i);
      if (char === '\n') {
        element.innerHTML += '<br>';
      } else {
        element.innerHTML += char;
      }
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
