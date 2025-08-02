const { faker } = require('@faker-js/faker');

// Gera CPF válido com dígito verificador
function generateValidCPF() {
  const rand = (n) => Math.floor(Math.random() * n);

  const base = Array.from({ length: 9 }, () => rand(10));
  const calcDigit = (base, factor) => {
    const sum = base.reduce((acc, val, i) => acc + val * (factor - i), 0);
    const digit = 11 - (sum % 11);
    return digit >= 10 ? 0 : digit;
  };

  const d1 = calcDigit(base, 10);
  const d2 = calcDigit([...base, d1], 11);

  return [...base, d1, d2].join('');
}

// Nome com pelo menos dois nomes e sem símbolos
function generateCleanFullName() {
  let name = faker.person.fullName();
  name = name.replace(/[^a-zA-Z\s]/g, '').trim();

  const parts = name.split(' ');
  if (parts.length < 2) {
    // adiciona um sobrenome aleatório se vier incompleto
    name += ' ' + faker.person.lastName();
  }

  return name;
}

// E-mail baseado no nome, com timestamp
function generateEmailFromName(name) {
  const clean = name.toLowerCase().replace(/\s+/g, '.');
  return `${clean}.${Date.now()}@example.com`;
}

// Senha forte com @ e símbolos
function generatePassword() {
  return faker.internet.password(8, true, /[A-Za-z0-9]/) + '@Test1';
}

// Função principal
const buildUserPayload = () => {
  const full_name = generateCleanFullName();
  const email = generateEmailFromName(full_name);
  const password = generatePassword();

  return {
    cpf: generateValidCPF(),
    full_name,
    email,
    password,
    confirmPassword: password
  };
};

module.exports = buildUserPayload;