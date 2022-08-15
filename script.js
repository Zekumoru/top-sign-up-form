
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
  'phone-number': document.querySelector('.error-text.phone-number'),
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
  const error = errorTexts.email;

  if (!input.classList.contains('aggressive')) return;
  if (!input.value) {
    input.classList.add('error');
    error.textContent = '* Email is required';
    error.style.display = 'block';
  }
  else if (!/^[\w\.]+@((?!-)[a-z\d-]{1,63}(?<!-))\.[a-z]{2,6}$/i.test(input.value)) {
    input.classList.add('error');
    error.textContent = '* Email must be a valid email';
    error.style.display = 'block';
  }
  else {
    input.classList.remove('error');
    error.style.display = 'none';
  }
});

inputs.email.addEventListener('focusout', (e) => {
  const input = e.target;
  const error = errorTexts['email'];

  if (!input.value) {
    input.classList.add('error');
    input.classList.add('aggressive');
    error.textContent = '* Email is required';
    error.style.display = 'block';
  }
  else if (!/^[\w\.]+@((?!-)[a-z\d-]{1,63}(?<!-))\.[a-z]{2,6}$/i.test(input.value)) {
    input.classList.add('error');
    input.classList.add('aggressive');
    error.textContent = '* Email must be a valid email';
    error.style.display = 'block';
  }
  else {
    input.classList.remove('error');
    error.style.display = 'none';
  }
});

inputs.phoneNumber.addEventListener('input', (e) => {
  const input = e.target;
  const error = errorTexts['phone-number'];

  if (input.classList.contains('error') && !input.value) {
    input.classList.remove('error');
    error.style.display = 'none';
    return;
  }

  if (!input.value || !input.classList.contains('aggressive')) return;

  if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(input.value)) {
    input.classList.add('error');
    error.style.display = 'block';
  }
  else {
    input.classList.remove('error');
    error.style.display = 'none';
  }
});

inputs.phoneNumber.addEventListener('focusout', (e) => {
  const input = e.target;
  const error = errorTexts['phone-number'];

  if (!input.value) return;

  if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(input.value)) {
    input.classList.add('error');
    input.classList.add('aggressive');
    error.style.display = 'block';
  }
  else {
    input.classList.remove('error');
    error.style.display = 'none';
  }
});

inputs.password.addEventListener('input', (e) => {
  const confirmPassword = inputs.confirmPassword;
  const input = e.target;
  const error = errorTexts['password'];

  if (!input.value) {
    confirmPassword.classList.add('error');
    input.classList.add('error');
    error.textContent = '* Password is required';
    error.style.display = 'block';
  }
  else if (confirmPassword.value !== input.value) {
    confirmPassword.classList.add('error');
    input.classList.add('error');
    error.textContent = '* Passwords do not match';
    error.style.display = 'block';
  }
  else {
    confirmPassword.classList.remove('error');
    input.classList.remove('error');
    error.style.display = 'none';
  }
});

inputs.confirmPassword.addEventListener('input', (e) => {
  const password = inputs.password;
  const input = e.target;
  const error = errorTexts['password'];

  if (password.value !== input.value) {
    password.classList.add('error');
    input.classList.add('error');
    error.textContent = '* Passwords do not match';
    error.style.display = 'block';
  }
  else {
    password.classList.remove('error');
    input.classList.remove('error');
    error.style.display = 'none';
  }
});

submit.addEventListener('click', (e) => {
  let valid = true;

  const isNameValid = (input) => {
    if (input.value) return;

    input.classList.add('error');
    errorTexts[input.id].style.display = 'block';
    valid = false;
  };

  isNameValid(inputs.firstName);
  isNameValid(inputs.lastName);

  if (!inputs.email.value) {
    inputs.email.classList.add('error');
    errorTexts.email.textContent = '* Email is required';
    errorTexts.email.style.display = 'block';
    valid = false;
  }
  else if (!/^[\w\.]+@((?!-)[a-z\d-]{1,63}(?<!-))\.[a-z]{2,6}$/i.test(inputs.email.value)) {
    valid = false;
  }
  
  if (inputs.phoneNumber.value && !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(inputs.phoneNumber.value)) {
    inputs.phoneNumber.classList.add('error');
    errorTexts[inputs.phoneNumber.id].display = 'block';
    valid = false;
  }

  if (!inputs.password.value) {
    inputs.password.classList.add('error');
    inputs.confirmPassword.classList.add('error');
    errorTexts.password.textContent = '* Password is required';
    errorTexts.password.style.display = 'block';
    valid = false;
  }
  else if (inputs.password.value !== inputs.confirmPassword.value) {
    inputs.password.classList.add('error');
    inputs.confirmPassword.classList.add('error');
    errorTexts.password.textContent = '* Passwords do not match';
    errorTexts.password.style.display = 'block';
    valid = false;
  }
  
  if (!valid) {
    e.preventDefault();
    return;
  }
});