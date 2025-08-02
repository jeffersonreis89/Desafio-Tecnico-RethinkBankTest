const { registerUser, confirmUserEmail } = require('../../helpers/auth');
const buildUserPayload = require('../../helpers/buildUserPayload');
require('dotenv').config();

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

describe('Auth - Confirmar E-mail - Cenário não esperado', () => {
  it('deve retornar erro para token inválido', async () => {
    const res = await confirmUserEmail('token-invalido-123');

    expect(res.status).toBe(400);
    expect(res.text).toBe('Token inválido ou expirado.');
  });

  it('deve retornar erro para token expirado (real)', async () => {
    const expiredToken = process.env.EXPIRED_CONFIRM_TOKEN;
    expect(expiredToken).toBeDefined();

    const res = await confirmUserEmail(expiredToken);

    expect(res.status).toBe(400);
    expect(res.text).toBe('Token inválido ou expirado.');
  });
});