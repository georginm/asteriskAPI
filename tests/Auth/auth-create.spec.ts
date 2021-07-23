import test from 'japa'
import supertest from 'supertest'

test.group('Auth Controller - Store', (group) => {
  test('Should return 400 if id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        authType: 'userpass',
        username: 'any_username',
        password: 'any_password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo id é obrigatório.')
  })

  test('Should return 400 if auth id already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'auth_',
        authType: 'userpass',
        username: 'anyusername',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo id deve ser único.')
  })

  test('Should return 400 if username was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'any_i',
        authType: 'userpass',
        password: 'any_password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo username é obrigatório.')
  })

  test('Should return 400 if authType was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'any_i',
        username: 'any_user',
        password: 'any_password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo authType é obrigatório.')
  })

  test('Should return 400 if password was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'any_i',
        authType: 'userpass',
        username: 'any_useryarn',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo password é obrigatório.')
  })
})
