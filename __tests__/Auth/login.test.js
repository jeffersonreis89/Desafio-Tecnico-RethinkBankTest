const { loginUser } = require('../../helpers/auth');
const createAndConfirmUser = require('../../helpers/createAndConfirmUser');

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
