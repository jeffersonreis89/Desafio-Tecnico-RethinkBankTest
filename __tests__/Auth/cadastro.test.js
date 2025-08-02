const { registerUser } = require('../../helpers/auth');
const buildUserPayload = require('../../helpers/buildUserPayload');
const {
  buildUserWithShortCPF,
  buildUserWithCpfLetters,
  buildUserWithShortName,
  buildUserWithInvalidEmail,
  buildUserWithPasswordNoSpecialChar,
  buildUserWithPasswordNoUpperCase,
  buildUserWithShortPassword,
  buildUserWithPasswordMismatch,
} = require('../../helpers/buildInvalidUserPayload');

describe('Auth - Cadastro - Testes Esperado', () => {
  let userPayload;

  beforeEach(() => {
    userPayload = buildUserPayload();
  });

  it('deve cadastrar um usuário com sucesso e retornar o token para confirmação de e-mail', async () => {
    const res = await registerUser(userPayload);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Cadastro realizado com sucesso.');
    expect(typeof res.body.confirmToken).toBe('string');
  });

  it('deve retornar somente os campos "message" e "confirmToken" no corpo da resposta', async () => {
    const res = await registerUser(userPayload);

    expect(Object.keys(res.body)).toEqual(['message', 'confirmToken']);
  });
});

describe('Auth - Cadastro - Fluxo não esperado', () => {
  it('retorna 400 quando senha e confirmação são diferentes', async () => {
    const res = await registerUser(buildUserWithPasswordMismatch());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Senhas não conferem');
  });

  it('retorna 400 para senha muito curta', async () => {
    const res = await registerUser(buildUserWithShortPassword());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Senha fraca');
  });

  it('retorna 400 para senha sem letra maiúscula', async () => {
    const res = await registerUser(buildUserWithPasswordNoUpperCase());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Senha fraca');
  });

  it('retorna 400 para senha sem caractere especial', async () => {
    const res = await registerUser(buildUserWithPasswordNoSpecialChar());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Senha fraca');
  });

  it('retorna 400 para email com formato inválido', async () => {
    const res = await registerUser(buildUserWithInvalidEmail());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Email inválido');
  });

  it('retorna 400 quando nome completo estiver incompleto', async () => {
    const res = await registerUser(buildUserWithShortName());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Nome completo obrigatório');
  });

  it('retorna 400 quando CPF contiver letras', async () => {
    const res = await registerUser(buildUserWithCpfLetters());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('CPF inválido');
  });

  it('retorna 400 quando CPF tiver menos de 11 dígitos', async () => {
    const res = await registerUser(buildUserWithShortCPF());
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('CPF inválido');
  });
});
