const postRegisterUser = require('../helpers/postRegisterUser');
const buildUserPayload = require('../helpers/buildUserPayload');

describe('Cenários positivos - Cadastro de novo usuário', () => {
  let userPayload;

  beforeEach(() => {
    userPayload = buildUserPayload();
  });

  it('deve cadastrar com sucesso e retornar o token de confirmação de e-mail', async () => {
    const res = await postRegisterUser(userPayload);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Cadastro realizado com sucesso.');
    expect(typeof res.body.confirmToken).toBe('string');
    expect(res.body.confirmToken.length).toBeGreaterThan(0);
  });

  it('deve retornar apenas "message" e "confirmToken" no corpo da resposta', async () => {
    const res = await postRegisterUser(userPayload);

    expect(Object.keys(res.body)).toEqual(['message', 'confirmToken']);
    expect(Object.keys(res.body).length).toBe(2);
  });
});
