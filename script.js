
const submit = document.querySelector('button.sign-up');

const inputs = {
  firstName: document.querySelector('#first-name'),
  lastName: document.querySelector('#last-name'),
  email: document.querySelector('#email'),
  phoneNumber: document.querySelector('#phone-number'),
  password: document.querySelector('#password'),
  confirmPassword: document.querySelector('#confirm-password')
};

const errorTexts = {
  'first-name': document.querySelector('.error-text.first-name'),
  'last-name': document.querySelector('.error-text.last-name'),
  'email': document.querySelector('.error-text.email'),
  'password': document.querySelector('.error-text.password')
};

const onInputChange = (e) => {
  const input = e.target;
  if (input.classList.contains('error') && input.value) {
    input.classList.remove('error');
    errorTexts[input.id].style.display = 'none';
  }
};

const onInputFocusOut = (e) => {
  const input = e.target;
  if (!input.value) {
    input.classList.add('error');
    errorTexts[e.target.id].style.display = 'block';
  }
};

inputs.firstName.addEventListener('input', onInputChange);
inputs.firstName.addEventListener('focusout', onInputFocusOut);
inputs.lastName.addEventListener('input', onInputChange);
inputs.lastName.addEventListener('focusout', onInputFocusOut);

inputs.email.addEventListener('input', (e) => {
  const input = e.target;

  if (!input.value) {
    input.classList.add('error');
    errorTexts.email.textContent = '* Email is required';
    errorTexts.email.style.display = 'block';
    return;
  }

  if (!/^[\w\.]+@((?!-)[a-z\d-]{1,63}(?<!-))\.[a-z]{2,6}$/i.test(input.value)) {
    input.classList.add('error');
    errorTexts.email.textContent = '* Email must be a valid email';
    errorTexts.email.style.display = 'block';
  }
  else {
    input.classList.remove('error');
    errorTexts.email.style.display = 'none';
  }
});

submit.addEventListener('click', (e) => {
  let valid = true;
  const isValid = (input) => {
    if (input.value) return;

    input.classList.add('error');
    errorTexts[input.id].style.display = 'block';
    valid = false;
  };


  e.preventDefault();
});