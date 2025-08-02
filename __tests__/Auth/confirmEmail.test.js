const { registerUser, confirmUserEmail } = require('../../helpers/auth');
const buildUserPayload = require('../../helpers/buildUserPayload');

describe('Auth - Confirmar E-mail', () => {
  let confirmToken;

  beforeAll(async () => {
    const user = buildUserPayload();
    const res = await registerUser(user);
    confirmToken = res.body.confirmToken;
  });

  it('deve confirmar o e-mail com token válido', async () => {
    const res = await confirmUserEmail(confirmToken);

    expect(res.status).toBe(200);
    expect(res.text).toBe('E-mail confirmado com sucesso.');
  });
});
