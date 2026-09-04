function goToScreen(screenNumber) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + screenNumber).classList.add('active');

  // Putar musik saat berpindah dari screen 1
  const music = document.getElementById('bg-music');
  if (music.paused) {
    music.play().catch(() => console.log("Autoplay blocked"));
  }

  // Jika masuk ke screen 4, jalankan ketik otomatis
  if (screenNumber === 4) {
    startTypewriter();
  }
}

// Logika Tahan Tombol Hati (Love Meter)
let percent = 0;
let timer;
const percentText = document.getElementById('percent');
const emojiText = document.getElementById('emoji');
const heartBtn = document.getElementById('heart-btn');
const nextBtn = document.getElementById('next-to-gallery');

const emojis = ['🤬', '😠', '😐', '😏', '😍', '🥰'];

function startHold() {
  timer = setInterval(() => {
    if (percent < 100) {
      percent++;
      percentText.innerText = percent;
      
      // Ubah emoji sesuai persentase
      if (percent < 20) emojiText.innerText = emojis[0];
      else if (percent < 40) emojiText.innerText = emojis[1];
      else if (percent < 60) emojiText.innerText = emojis[2];
      else if (percent < 80) emojiText.innerText = emojis[3];
      else if (percent < 100) emojiText.innerText = emojis[4];
    } else {
      clearInterval(timer);
      emojiText.innerText = emojis[5];
      nextBtn.classList.remove('hidden');
      heartBtn.style.pointerEvents = 'none';
    }
  }, 30);
}

function stopHold() {
  clearInterval(timer);
}

heartBtn.addEventListener('mousedown', startHold);
heartBtn.addEventListener('mouseup', stopHold);
heartBtn.addEventListener('mouseleave', stopHold);

heartBtn.addEventListener('touchstart', (e) => { e.preventDefault(); startHold(); });
heartBtn.addEventListener('touchend', stopHold);

// Popup Galeri
function openPopup(title, text, imgSrc) {
  document.getElementById('popup-title').innerText = title;
  document.getElementById('popup-text').innerText = text;
  document.getElementById('popup-img').src = imgSrc;
  document.getElementById('popup-modal').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup-modal').style.display = 'none';
}

// Efek Ketik Otomatis (Typewriter)
const fullText = "Selamat ulang tahun ya sayang.\n\nSemoga hari ini menjadi awal dari banyak kebahagiaan baru. Semoga semua doa dan impianmu satu per satu menjadi kenyataan.\n\nTerima kasih sudah hadir dan menjadi bagian terindah dalam hidupku.\n\nI Love You ❤️";

function startTypewriter() {
  let i = 0;
  const speed = 50;
  const element = document.getElementById('typewriter-text');
  element.innerText = "";

  function type() {
    if (i < fullText.length) {
      element.innerText += fullText.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}


