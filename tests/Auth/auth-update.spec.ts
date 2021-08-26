import test from 'japa'
import supertest from 'supertest'

test.group('Auth Controller - Update', () => {
  // ############################### ID ##############################
  test('Should return 400 if auth id provided not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/inval')
      .send({
        username: 'username',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O registro de params.id não existe.')
  })

  test('Should return 404 if auth id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths')
      .send({
        username: 'username',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)

    assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/auths')
  })

  test('Should return 422 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/id_exceeds')
      .send({
        username: 'anyusername',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo params.id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 422 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/id')
      .send({
        username: 'anyusername',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo params.id deve ser de no mínimo 3 caracteres.'
    )
  })

  // ########################### USERNAME ###########################
  test('Should return 400 if username provided already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/auth_')
      .send({
        username: 'any_username',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    assert.equal(body.message, 'O campo username deve ser único.')
  })

  test('Should return 422 if username exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/auth_')
      .send({
        username: '-anyusername-anyusername-anyusername-anyusername',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo username deve ser de no máximo 40 caracteres.'
    )
  })

  // ############################ PASSWORD ###########################
  test('Should return 422 if password exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/auth_')
      .send({
        username: 'anyusername',
        password:
          '-anypassword-anypassword-anypassword-anypassword-anypassword-anypassword-anypassword-anypassword',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo password deve ser de no máximo 80 caracteres.'
    )
  })

  // #################### AUTH HAS BEEN UPDATED ######################
  test('Should return 200 if auth has been created', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/auth_')
      .send({
        username: 'any_user',
        password: 'password',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.equal(body.id, 'auth_')
    assert.equal(body.username, 'any_user')
    assert.equal(body.password, 'password')
    assert.equal(body.auth_type, 'userpass')
  })
})
