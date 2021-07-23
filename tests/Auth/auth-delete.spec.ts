import test from 'japa'
import supertest from 'supertest'

test.group('Auth Controller - Delete', (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/auths').send({
      id: 'any_',
      username: 'any',
      password: 'any',
    })
  })
})
