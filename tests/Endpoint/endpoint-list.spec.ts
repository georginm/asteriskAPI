import supertest from 'supertest'
import test from 'japa'

test.group('Endpoint - List', async (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/aors').send({ id: 'aors2' })
    await supertest(process.env.BASE_URL).post('/auths').send({
      id: 'auth2',
      auth_type: 'userpass',
      username: 'any_username2',
      password: 'any_password2',
    })
  })

  group.after(async () => {
    await supertest(process.env.BASE_URL).delete('/aors/aors2')
    await supertest(process.env.BASE_URL).delete('/auths/auths2')
    await supertest(process.env.BASE_URL).delete('/endpoints/test')
  })
})
