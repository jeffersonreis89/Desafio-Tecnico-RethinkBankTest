const { sendPoints } = require('../../helpers/points');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');

describe('Points - Enviar Pontos', () => {
  let senderUser;
  let recipientUser;
  let token;

  beforeAll(async () => {
    senderUser = await createAndConfirmUser();  
    recipientUser = await createAndConfirmUser(); 
    token = senderUser.token;
  });

  it('deve enviar pontos com sucesso para um CPF válido', async () => {
    const res = await sendPoints(token, {
      recipientCpf: recipientUser.cpf, 
      amount: 50,
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Pontos enviados com sucesso.');
  });
});
