import test from 'japa'
import supertest from 'supertest'

test.group('Auth Controller - Store', (group) => {
  // ############################# ID ################################
  test('Should return 400 if id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
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
        username: 'anyusername',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo id deve ser único.')
  })

  test('Should return 400 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'id_exceeds',
        username: 'anyusername',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'id',
        username: 'anyusername',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no mínimo 3 caracteres.'
    )
  })

  test('Should return 400 if id receives a number', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 144,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo id deve ser de texto.')
  })

  // ########################### USERNAME ###########################
  test('Should return 400 if username was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'any_i',
        password: 'any_password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo username é obrigatório.')
  })

  test('Should return 400 if auth username already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'any',
        username: 'any_username',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo username deve ser único.')
  })

  test('Should return 400 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'any_i',
        username: '-anyusername-anyusername-anyusername-anyusername',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo username deve ser de no máximo 40 caracteres.'
    )
  })

  test('Should return 400 if password was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/auths')
      .send({
        id: 'any_i',
        username: 'any_useryarn',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo password é obrigatório.')
  })
})
