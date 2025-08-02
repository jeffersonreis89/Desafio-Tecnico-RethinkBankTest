const { registerUser, confirmUserEmail } = require('./auth');
const buildUserPayload = require('./buildUserPayload');

async function createAndConfirmUser() {
  const userPayload = buildUserPayload();

  const resRegister = await registerUser(userPayload);
  const confirmToken = resRegister.body.confirmToken;

  await confirmUserEmail(confirmToken);

  return userPayload; // retorna o payload pronto para login
}

module.exports = createAndConfirmUser;