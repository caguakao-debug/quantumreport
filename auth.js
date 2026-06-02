/* ============================================
   QUANTUMREPORT — Auth (Login / Register)
   ============================================ */

// --- Toggle password visibility ---
document.querySelectorAll('.auth__toggle-pass').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = btn.closest('.auth__password-wrap').querySelector('input');
    const isPass = input.getAttribute('type') === 'password';
    input.setAttribute('type', isPass ? 'text' : 'password');
    btn.innerHTML = isPass
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  });
});

// --- Login form ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector('.auth__submit');
    btn.textContent = 'Ingresando…';
    btn.disabled = true;
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 1200);
  });
}

// --- Register form ---
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pass = document.getElementById('password');
    const confirm = document.getElementById('confirmar');

    if (pass.value !== confirm.value) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const btn = registerForm.querySelector('.auth__submit');
    btn.textContent = 'Creando cuenta…';
    btn.disabled = true;
    setTimeout(() => {
      window.location.href = '/dashboard.html';
    }, 1500);
  });
}
