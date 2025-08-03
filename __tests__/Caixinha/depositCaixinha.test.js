const { depositToPiggyBank } = require('../../helpers/caixinha');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');

describe('Caixinha - Depósito', () => {
  let user;
  let token;

  beforeAll(async () => {
    user = await createAndConfirmUser();
    token = user.token;
  });

  it('deve realizar o depósito na caixinha com sucesso', async () => {
    const res = await depositToPiggyBank(token, { amount: 30 });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Depósito na caixinha realizado.');
  });

  it('deve retornar 400 quando o saldo for insuficiente', async () => {
    const res = await depositToPiggyBank(token, { amount: 9999 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Saldo insuficiente');
  });

  it('deve retornar 401 quando o token for inválido', async () => {
    const res = await depositToPiggyBank('token-falso-123', { amount: 30 });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token inválido ou expirado');
  });
});
