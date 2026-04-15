// ============================================
// Custom Paint Works - main.js
// ============================================

// ---- SUPABASE CREDENTIALS -------------------
// Replace the two strings below with your own values from
// Supabase -> Project Settings -> API.
const SUPABASE_URL = 'https://bzokyshryisrzcdxwrjp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_FtHLAkDiN6GFElYWaCg-jA_q7tmo4nl';
// ---------------------------------------------

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth-scroll for any in-page anchor (nav + CTA buttons)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length <= 1) return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    const navHeight = document.querySelector('.nav').offsetHeight;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ============================================
// Contact / Quote form
// ============================================
const form = document.getElementById('contact');
const status = document.getElementById('formStatus');
const submitBtn = form.querySelector('button[type="submit"]');
const submitBtnDefaultText = submitBtn.textContent;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    message: form.message.value.trim()
  };

  // Basic validation
  if (!payload.name || !payload.email || !payload.phone || !payload.message) {
    showStatus('Please fill out every field.', 'error');
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
    showStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Prevent double-submits
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  showStatus('Sending...', '');

  try {
    const { error } = await supabaseClient
      .from('contact_submissions')
      .insert([payload]);

    if (error) throw error;

    form.reset();
    showStatus("Thanks! We'll be in touch soon.", 'success');
  } catch (err) {
    console.error('Supabase insert failed:', err);
    showStatus("Sorry - we couldn't send that just now. Please try again or call the shop.", 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = submitBtnDefaultText;
  }
});

function showStatus(msg, type) {
  status.textContent = msg;
  status.className = 'form-status' + (type ? ' ' + type : '');
}
