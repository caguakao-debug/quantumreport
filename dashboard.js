/* ============================================
   QUANTUMREPORT — Dashboard
   ============================================ */

// --- Navegación entre Inicio y Mi Perfil ---
const navLinks = document.querySelectorAll('.topbar__link');
const sections = {
  inicio: document.getElementById('inicio'),
  perfil: document.getElementById('perfil'),
};

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href').replace('#', '');

    navLinks.forEach((l) => l.classList.remove('topbar__link--active'));
    link.classList.add('topbar__link--active');

    Object.entries(sections).forEach(([key, section]) => {
      if (key === target) {
        section.style.display = 'block';
        section.classList.remove('dash__section--hidden');
      } else {
        section.style.display = 'none';
        section.classList.add('dash__section--hidden');
      }
    });
  });
});

// --- Upload zone ---
const uploadZone = document.getElementById('uploadZone');
const fileInput = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');
const fileName = document.getElementById('fileName');
const analyzeBtn = document.getElementById('analyzeBtn');

// Click zone
uploadZone.addEventListener('click', () => fileInput.click());

// Drag & drop
uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.classList.add('upload-zone--active');
});
uploadZone.addEventListener('dragleave', () => {
  uploadZone.classList.remove('upload-zone--active');
});
uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.classList.remove('upload-zone--active');
  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
});

// File input change
fileInput.addEventListener('change', () => {
  if (fileInput.files.length) handleFile(fileInput.files[0]);
});

function handleFile(file) {
  fileName.textContent = file.name;
  uploadZone.style.display = 'none';
  uploadPreview.style.display = 'flex';
}

// --- Simular análisis ---
analyzeBtn.addEventListener('click', () => {
  const btn = analyzeBtn;
  btn.textContent = 'Analizando…';
  btn.disabled = true;

  setTimeout(() => {
    btn.textContent = 'Analizar con IA';
    btn.disabled = false;

    document.getElementById('resultEmpty').style.display = 'none';
    document.getElementById('resultContent').style.display = 'block';

    // Aplicar logo y datos del perfil
    const savedLogo = localStorage.getItem('qr_logo');
    const savedName = localStorage.getItem('qr_name');
    const savedSlogan = localStorage.getItem('qr_slogan');

    if (savedLogo) {
      document.getElementById('resultLogo').src = savedLogo;
      document.getElementById('resultLogo').style.display = 'block';
    }
    if (savedName) document.getElementById('resultClinica').textContent = savedName;
    if (savedSlogan) document.getElementById('resultSlogan').textContent = savedSlogan;
  }, 1800);
});

// --- WhatsApp ---
document.getElementById('sendWhatsapp')?.addEventListener('click', () => {
  const telefono = localStorage.getItem('qr_whatsapp') || '';
  const nombre = document.getElementById('resultClinica').textContent;
  const body = encodeURIComponent(
    `🩺 *${nombre}* te comparte tu resumen de biorresonancia:\n\n` +
    document.getElementById('resultBody').innerText
  );
  const url = telefono
    ? `https://wa.me/${telefono.replace(/[^0-9]/g, '')}?text=${body}`
    : `https://wa.me/?text=${body}`;
  window.open(url, '_blank');
});

// --- Profile: subir logo ---
document.getElementById('uploadLogoBtn')?.addEventListener('click', () => {
  document.getElementById('logoInput').click();
});

document.getElementById('logoInput')?.addEventListener('change', (e) => {
  if (e.target.files.length) {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const preview = document.getElementById('logoPreview');
      preview.innerHTML = `<img src="${ev.target.result}" alt="Logo">`;
      localStorage.setItem('qr_logo', ev.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
});

// --- Profile: guardar ---
document.getElementById('profileForm')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('profileName').value;
  const slogan = document.getElementById('profileSlogan').value;
  const whatsapp = document.getElementById('profileWhatsapp').value;

  localStorage.setItem('qr_name', name);
  localStorage.setItem('qr_slogan', slogan);
  localStorage.setItem('qr_whatsapp', whatsapp);

  const btn = e.target.querySelector('.btn--primary');
  const orig = btn.textContent;
  btn.textContent = '✅ Guardado';
  btn.style.pointerEvents = 'none';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.pointerEvents = '';
  }, 2000);
});
