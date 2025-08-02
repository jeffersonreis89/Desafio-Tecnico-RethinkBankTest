const { registerUser, confirmUserEmail, loginUser } = require('./auth');
const buildUserPayload = require('./buildUserPayload');

async function createAndConfirmUser() {
  const userPayload = buildUserPayload();

  const resRegister = await registerUser(userPayload);
  const confirmToken = resRegister.body.confirmToken;

  await confirmUserEmail(confirmToken);


  const resLogin = await loginUser({ email: userPayload.email, password: userPayload.password });

  return {
    ...userPayload,
    token: resLogin.body.token,
  };
}

module.exports = createAndConfirmUser;
