 document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        const inputs = form.querySelectorAll('input, textarea, select');

        // Remove existing validation styles
        inputs.forEach(input => {
          input.classList.remove('is-valid', 'is-invalid');
        });

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          // Add is-invalid or is-valid
          inputs.forEach(input => {
            if (!input.checkValidity()) {
              input.classList.add('is-invalid');
            } else {
              input.classList.add('is-valid');
            }
          });
        } else {
          // Optional: success styling before real submission
          inputs.forEach(input => input.classList.add('is-valid'));
        }

        form.classList.add('was-validated');
      }, false);
    });
  });