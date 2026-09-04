function goToScreen(screenNumber) {
  // Sembunyikan semua layar
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  // Tampilkan layar tujuan
  const targetScreen = document.getElementById('screen-' + screenNumber);
  if (targetScreen) {
    targetScreen.classList.add('active');
  }

  // Putar musik saat ada aksi klik tombol
  const music = document.getElementById('bg-music');
  if (music) {
    music.muted = false;
    music.play().then(() => {
      console.log("Musik diputar!");
    }).catch(err => {
      console.log("Autoplay ditahan browser:", err);
    });
  }

  // Jalankan efek ketik otomatis saat sampai di layar 4
  if (screenNumber === 4) {
    startTypewriter();
  }
}

// Logika Love Meter (Hati)
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
  if (pImg) {
    pImg.src = imgSrc;
    pImg.style.display = 'block';
  }
  if (pModal) pModal.style.display = 'flex';
}

// Logika Kupon Virtual
let claimedCount = 0;
function claimCoupon(element, title, text) {
  const pImg = document.getElementById('popup-img');
  if (pImg) pImg.style.display = 'none';

  const pTitle = document.getElementById('popup-title');
  const pText = document.getElementById('popup-text');
  const pModal = document.getElementById('popup-modal');

  if (pTitle) pTitle.innerText = title;
  if (pText) pText.innerText = text;
  if (pModal) pModal.style.display = 'flex';

  if (!element.classList.contains('opened')) {
    element.classList.add('opened');
    element.querySelector('.box-icon').innerText = '🎉';
    claimedCount++;
  }

  if (claimedCount >= 4) {
    const btnNext = document.getElementById('btn-to-screen4');
    if (btnNext) btnNext.classList.remove('hidden');
  }
}

function closePopup() {
  const pModal = document.getElementById('popup-modal');
  if (pModal) pModal.style.display = 'none';
}

// Ucapan Spesial Ulang Tahun
const fullText = "Selamat 23 tahun, Dian.\nDimanapun selalu hangat karena ada kamu.\nTerima kasih sudah jadi adik terbaik. Mas sayang kamu ❤️\n\nSemoga umur berkah, rezeki lancar, mimpi terkabul.\nMas selalu doain kamu 🤲\n\nUntuk Dian di 23 tahunnya.\nTumbuhlah jadi perempuan hebat.\nKarena kamu layak dapat dunia yang lembut. ❤️\n\nBarakallah fii umrik adikku tersayang.\nDi umur kamu yang baru ini, semoga Allah jaga terus senyum kamu.\n\nKamu itu paket lengkap: lucu, pinter, kadang nyebelin 😂\nTapi Mas bersyukur banget punya adek kayak kamu.\n\nTerus jadi anak hebat ya. Mas selalu support kamu!";

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
