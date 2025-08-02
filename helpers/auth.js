const request = require('supertest');
const { apiBaseUrl } = require('./config');

// POST /cadastro
async function registerUser(payload) {
  return await request(apiBaseUrl)
    .post('/cadastro')
    .send(payload);
}

// GET /confirm-email?token=...
async function confirmUserEmail(token) {
  return await request(apiBaseUrl)
    .get('/confirm-email')
    .query({ token });
}

// POST /login
async function loginUser(credentials) {
  return await request(apiBaseUrl)
    .post('/login')
    .send(credentials);
}

module.exports = {
  registerUser,
  confirmUserEmail,
  loginUser
};
