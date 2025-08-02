const { sendPoints, getExtrato } = require('../../helpers/points');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');

describe('Points - Extrato de Pontos', () => {
  let senderUser;
  let recipientUser;
  let token;

  beforeAll(async () => {
    senderUser = await createAndConfirmUser();
    recipientUser = await createAndConfirmUser();
    token = senderUser.token;
  });

  it('deve retornar extrato vazio quando nenhum ponto foi enviado', async () => {
    const res = await getExtrato(token);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('deve enviar pontos com sucesso', async () => {
    const res = await sendPoints(token, {
      recipientCpf: recipientUser.cpf,
      amount: 50,
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Pontos enviados com sucesso.');
  });

  it('deve retornar extrato com transação após envio de pontos', async () => {
    const res = await getExtrato(token);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const transacao = res.body[0];
    expect(transacao).toHaveProperty('id');
    expect(transacao).toHaveProperty('from_user');
    expect(transacao).toHaveProperty('to_user');
    expect(transacao).toHaveProperty('amount', 50);
    expect(transacao).toHaveProperty('created_at');
  });
});
