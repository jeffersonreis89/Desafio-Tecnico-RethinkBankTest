const buildUserPayload = require('./buildUserPayload');

const buildUserWithShortCPF = () => {
  const user = buildUserPayload();
  user.cpf = '1234567';
  return user;
};

const buildUserWithCpfLetters = () => {
  const user = buildUserPayload();
  user.cpf = 'abcde123456';
  return user;
};

const buildUserWithShortName = () => {
  const user = buildUserPayload();
  user.full_name = 'João';
  return user;
};

const buildUserWithInvalidEmail = () => {
  const user = buildUserPayload();
  user.email = 'joaoemail.com';
  return user;
};

const buildUserWithPasswordNoSpecialChar = () => {
  const user = buildUserPayload();
  user.password = 'Senha1234';
  user.confirmPassword = 'Senha1234';
  return user;
};

const buildUserWithPasswordNoUpperCase = () => {
  const user = buildUserPayload();
  user.password = 'senha@1234';
  user.confirmPassword = 'senha@1234';
  return user;
};

const buildUserWithShortPassword = () => {
  const user = buildUserPayload();
  user.password = 'S@1a';
  user.confirmPassword = 'S@1a';
  return user;
};

const buildUserWithPasswordMismatch = () => {
  const user = buildUserPayload();
  user.confirmPassword = 'SenhaDiferente@123';
  return user;
};

module.exports = {
  buildUserWithShortCPF,
  buildUserWithCpfLetters,
  buildUserWithShortName,
  buildUserWithInvalidEmail,
  buildUserWithPasswordNoSpecialChar,
  buildUserWithPasswordNoUpperCase,
  buildUserWithShortPassword,
  buildUserWithPasswordMismatch,
};
