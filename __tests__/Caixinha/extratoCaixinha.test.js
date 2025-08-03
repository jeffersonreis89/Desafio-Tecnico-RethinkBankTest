const { depositToPiggyBank, getPiggyBankExtrato } = require('../../helpers/caixinha');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');

describe('Caixinha - Extrato', () => {
  let user;
  let token;

  beforeAll(async () => {
    user = await createAndConfirmUser();
    token = user.token;
  });

  it('deve retornar extrato vazio ou sem registros antes do depósito', async () => {
    const res = await getPiggyBankExtrato(token);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve adicionar uma entrada no extrato após depósito', async () => {
    await depositToPiggyBank(token, { amount: 30 });

    const res = await getPiggyBankExtrato(token);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const firstEntry = res.body[0];
    expect(firstEntry).toHaveProperty('id');
    expect(firstEntry).toHaveProperty('user_id');
    expect(firstEntry).toHaveProperty('type');
    expect(firstEntry).toHaveProperty('amount');
    expect(firstEntry).toHaveProperty('created_at');

    expect(firstEntry.type).toBe('deposit');
    expect(typeof firstEntry.amount).toBe('number');
    expect(firstEntry.amount).toBe(30);
  });

  it('deve retornar erro 401 quando o token for inválido', async () => {
    const res = await getPiggyBankExtrato('Bearer token-invalido');

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token inválido ou expirado');
  });
});
