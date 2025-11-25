const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkrHS7QYsSigrh5OTZ2ODQHMvg78bvqO6NyGrkVz3Jgsb5JUAAMi6fxLZpXNCU_hAiew/exec';

function toggleSuccessMessage(text) {
  if (!successMessage) return;
  successMessage.textContent = text;
  successMessage.classList.add('show');
  setTimeout(() => successMessage.classList.remove('show'), 5000);
}

if (form) {
  // Prevent Enter (Return) from submitting the form when focused on inputs (allow Enter in TEXTAREA)
  form.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  // Flag to avoid duplicated / simultaneous submissions
  let isSubmitting = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isSubmitting) return; // ignore extra submits
    isSubmitting = true;

    const submitBtn = form.querySelector('.submit-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
    }

    const formData = new FormData(form);

    fetch(SCRIPT_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(() => {
        form.reset();
        toggleSuccessMessage('Registration received! We will be in touch shortly.');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('We could not submit your registration. Please try again.');
      })
      .finally(() => {
        isSubmitting = false;
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Registration';
        }
      });
  });

  // Optional: If you use a custom button (type="button"), attach click to call submit
  const customBtn = form.querySelector('.submit-btn[type="button"]');
  if (customBtn) {
    customBtn.addEventListener('click', () => form.requestSubmit());
    // requestSubmit() triggers the submit event and respects validation
  }
}
