const otpInputs = document.querySelectorAll('.otp-inputs input');
const otpSpan = document.getElementById('generatedOTP');
const verifyBtn = document.getElementById('verifyBtn');
const otpMessage = document.getElementById('otpMessage');

const otp = Math.floor(1000 + Math.random() * 9000).toString();
otpSpan.textContent = otp;

// Move cursor automatically
otpInputs.forEach((input, idx) => {
  input.addEventListener('input', (e) => {
    if (/^\d$/.test(e.target.value)) {
      if (idx < otpInputs.length - 1) {
        otpInputs[idx + 1].focus();
      }
    } else {
      input.value = '';
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && input.value === '' && idx > 0) {
      otpInputs[idx - 1].focus();
    }
  });
});

// Reset visuals
function resetFeedback() {
  otpInputs.forEach(input => {
    input.classList.remove('correct', 'wrong');
  });
  otpMessage.textContent = '';
  otpMessage.classList.remove('success', 'error');
}

// Verify OTP
verifyBtn.addEventListener('click', () => {
  const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');

  if (enteredOTP === otp) {
    otpInputs.forEach(input => input.classList.add('correct'));
    otpMessage.textContent = "✅ OTP Verified!";
    otpMessage.classList.add('success');
  } else {
    otpInputs.forEach(input => input.classList.add('wrong'));
    otpMessage.textContent = "❌ Invalid OTP!";
    otpMessage.classList.add('error');
  }

  setTimeout(resetFeedback, 2500); // Clear feedback after 2.5s
});
