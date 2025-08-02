const request = require('supertest');
const { apiBaseUrl } = require('./config');

// POST /points/send
async function sendPoints(token, { recipientCpf, amount }) {
  return await request(apiBaseUrl)
    .post('/points/send')
    .set('Authorization', `Bearer ${token}`)
    .send({ recipientCpf, amount });
}

module.exports = {
  sendPoints,
};
