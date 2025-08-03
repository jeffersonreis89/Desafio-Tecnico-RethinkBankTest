const request = require('supertest');
const { apiBaseUrl } = require('./config');

// POST /caixinha/deposit
async function depositToPiggyBank(token, body) {
  return await request(apiBaseUrl)
    .post('/caixinha/deposit')
    .set('Authorization', `Bearer ${token}`)
    .send(body);
}

// POST /caixinha/withdraw
async function withdrawFromPiggyBank(token, body) {
  return await request(apiBaseUrl)
    .post('/caixinha/withdraw')
    .set('Authorization', `Bearer ${token}`)
    .send(body);
}

// GET /caixinha/extrato
async function getPiggyBankExtrato(token) {
  return await request(apiBaseUrl)
    .get('/caixinha/extrato')
    .set('Authorization', `Bearer ${token}`);
}

module.exports = {
  depositToPiggyBank,
  withdrawFromPiggyBank,
  getPiggyBankExtrato
};

