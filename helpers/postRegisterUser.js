const request = require('supertest');

const api = 'https://points-app-backend.vercel.app';

async function postRegisterUser(userPayload) {
  return await request(api)
    .post('/cadastro')
    .send(userPayload);
}

module.exports = postRegisterUser;
