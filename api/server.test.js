const request = require('supertest');
const server = require('./server');

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

test('correct environment', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /register', () => {
  test('not valid without username', async () => {
    const time = await request(server).post('/api/auth/register').send({
      username: '', 
      password: 'adadada',
    })
    expect(time.body).toBe("username and password required");
  })

  test('not valid without password', async () => {
    const time = await request(server).post('/api/auth/register').send({
      username: 'timyy', 
      password: '',
    })
    expect(time.body).toBe("username and password required");
})
})

describe('[POST] /login', () => {
  test('not valid without username', async () => {
    const time = await request(server).post('/login').send({
      username: '', 
      password: 'lalala'
    })
    expect(time.status).toBe(404)
  })
  test('not valid without password', async () => {
    const time = await request(server).post('/api/auth/login').send({
      username: 'timyy', 
      password: '',
    })
    expect(time.body).toBe("username and password required");
  })
}) 