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

  it('deve retornar 400 para valor inválido (amount = 0)', async () => {
    const res = await sendPoints(token, {
      recipientCpf: recipientUser.cpf,
      amount: 0,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Valor inválido');
  });

//Esse teste está com falha por conta de um Bug, pois a mensagem conforme contrato do Swagger é "Não autorizado" e não "Token inválido"
  it('deve retornar 401 quando token for inválido', async () => {
    const res = await sendPoints('token-falso-123', {
      recipientCpf: recipientUser.cpf,
      amount: 50,
    });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Token inválido ou expirado');
  });

  it('deve retornar 404 quando CPF do destinatário não existir', async () => {
    const res = await sendPoints(token, {
      recipientCpf: '99999999999', // CPF que não existe
      amount: 50,
    });

    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Usuário destino não encontrado');
  });

    it('deve retornar 400 quando o saldo for insuficiente', async () => {
    const res = await sendPoints(token, {
      recipientCpf: recipientUser.cpf,
      amount: 300, 
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Saldo insuficiente');
  });
});
