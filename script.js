const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

// REPLACE THIS URL WITH YOUR GOOGLE APPS SCRIPT WEB APP URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzkrHS7QYsSigrh5OTZ2ODQHMvg78bvqO6NyGrkVz3Jgsb5JUAAMi6fxLZpXNCU_hAiew/exec';

function toggleSuccessMessage(text) {
  if (!successMessage) return;
  successMessage.textContent = text;
  successMessage.classList.add('show');
  setTimeout(() => successMessage.classList.remove('show'), 5000);
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

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
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Registration';
      });
  });
}
