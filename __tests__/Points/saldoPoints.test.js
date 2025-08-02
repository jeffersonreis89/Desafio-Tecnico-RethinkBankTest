const { getBalance } = require('../../helpers/points');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');

describe('Points - Saldo Geral', () => {
  let user;
  let token;

  beforeAll(async () => {
    user = await createAndConfirmUser();
    token = user.token;
  });

  it('deve retornar o saldo geral com token válido', async () => {
    const res = await getBalance(token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('normal_balance');
    expect(res.body).toHaveProperty('piggy_bank_balance');
    expect(typeof res.body.normal_balance).toBe('number');
    expect(typeof res.body.piggy_bank_balance).toBe('number');
  });

  it('novo usuário deve iniciar com 100 pontos no saldo normal', async () => {
    const newUser = await createAndConfirmUser();
    const res = await getBalance(newUser.token);

    expect(res.status).toBe(200);
    expect(res.body.normal_balance).toBe(100);
  });

  it('deve retornar erro 401 quando o token for inválido', async () => {
    const res = await getBalance('Bearer token-invalido');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token inválido ou expirado');
  });
});
