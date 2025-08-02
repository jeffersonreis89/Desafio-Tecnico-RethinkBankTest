const { registerUser } = require('../../helpers/auth');
const buildUserPayload = require('../../helpers/buildUserPayload');

describe('Auth - Cadastro', () => {
  let userPayload;

  beforeEach(() => {
    userPayload = buildUserPayload();
  });

  it('deve cadastrar com sucesso e retornar o token de confirmação de e-mail', async () => {
    const res = await registerUser(userPayload);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Cadastro realizado com sucesso.');
    expect(typeof res.body.confirmToken).toBe('string');
  });

  it('deve retornar apenas "message" e "confirmToken" no corpo da resposta', async () => {
    const res = await registerUser(userPayload);

    expect(Object.keys(res.body)).toEqual(['message', 'confirmToken']);
  });
});
