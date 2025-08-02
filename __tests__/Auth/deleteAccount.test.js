const { deleteAccount } = require('../../helpers/auth');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');
const { buildUserWithWrongPassword } = require('../../helpers/buildInvalidUserPayload');


describe('Auth - Excluir Conta', () => {
  let user;
  let token;

  beforeAll(async () => {
    user = await createAndConfirmUser();
    token = user.token; // supondo que createAndConfirmUser retorne token de sessão
  });

  it('deve excluir a conta com a senha correta', async () => {
    const res = await deleteAccount(token, user.password);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Conta marcada como deletada.');
  });

  it('não deve excluir a conta com senha incorreta', async () => {
    const invalidUser = buildUserWithWrongPassword();

    const res = await deleteAccount(token, invalidUser.wrongPassword);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Senha inválida');
  });


  //Essa teste está com falha por conta de um Bug, pois a mensagem conforme contrato do Swagger é "Não autorizado" e não "Token inválido"
  it('não deve excluir a conta sem token válido', async () => {
    const res = await deleteAccount('token-invalido', user.password);

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Não autorizado');
  });
});
