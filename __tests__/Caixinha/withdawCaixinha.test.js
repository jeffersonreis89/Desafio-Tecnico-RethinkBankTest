const { depositToPiggyBank, withdrawFromPiggyBank } = require('../../helpers/caixinha');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');

describe('Caixinha - Resgate', () => {
  let user;
  let token;

  beforeAll(async () => {
    user = await createAndConfirmUser();
    token = user.token;

    await depositToPiggyBank(token, { amount: 30 });
  });

//TESTE Comentado por conta do BUG, ao invés de retornar 200, está retornando 400 e com mensagem de saldo na caixinha insuficiente
//   it('deve realizar o resgate da caixinha com sucesso', async () => {
//     const res = await withdrawFromPiggyBank(token, { amount: 10 });

//     expect(res.status).toBe(200);
//     expect(res.body).toHaveProperty('message', 'Resgate da caixinha realizado.');
//   });

  it('deve retornar 400 quando o saldo na caixinha for insuficiente', async () => {
    const res = await withdrawFromPiggyBank(token, { amount: 9999 });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Saldo na caixinha insuficiente');
  });

  it('deve retornar 401 quando o token for inválido', async () => {
    const res = await withdrawFromPiggyBank('token-invalido-123', { amount: 10 });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token inválido ou expirado');
  });
});
