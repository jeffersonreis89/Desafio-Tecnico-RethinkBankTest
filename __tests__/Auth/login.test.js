const { loginUser, registerUser } = require('../../helpers/auth');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');
const {
  buildUserNotRegistered,
  buildUserWithWrongPassword,
  buildUnconfirmedUser
} = require('../../helpers/buildInvalidUserPayload');

describe('Auth - Login', () => {
  let userPayload;

  beforeAll(async () => {
    userPayload = await createAndConfirmUser(); // já cadastrado e confirmado
  });

  it('deve fazer login com sucesso', async () => {
    const res = await loginUser({
      email: userPayload.email,
      password: userPayload.password
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });
});

describe('Auth - Login - Cenários de Erro', () => {
  let validUser;

  beforeAll(async () => {
    validUser = await createAndConfirmUser();
  });

  it('deve retornar erro para e-mail inválido (usuário não cadastrado)', async () => {
    const user = buildUserNotRegistered();

    const res = await loginUser({
      email: user.email,
      password: user.password
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Credenciais inválidas');
  });

  it('deve retornar erro para senha incorreta', async () => {
    const user = buildUserWithWrongPassword();

    const res = await loginUser({
      email: validUser.email,
      password: user.wrongPassword
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Credenciais inválidas');
  });

  it('deve retornar erro quando o e-mail ainda não foi confirmado', async () => {
    const user = buildUnconfirmedUser();
    await registerUser(user); 

    const res = await loginUser({
      email: user.email,
      password: user.password
    });

    expect(res.status).toBe(403);
    expect(res.body.error).toBe('E-mail não confirmado');
  });
});
