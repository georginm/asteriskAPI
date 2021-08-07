import test from 'japa'
import supertest from 'supertest'

test.group('Auth Controller - List', () => {
  // ############################### ID ##############################
  test('Should return 400 if auth id provided not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/auths/list/?id=not_e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message, 'O registro de id não existe.')
  })

  test('Should return 400 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/auths/list/?id=exceeeeed')
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
      .get('/auths/list/?id=id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no mínimo 3 caracteres.'
    )
  })

  // ########################### USERNAME ###########################
  test('Should return 400 if username provided not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/auths/list/?username=not_e')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O registro de username não existe.')
  })

  test('Should return 400 if username exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/auths/list/?username=anyusernameanyusernameanyusernameanyusername')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo username deve ser de no máximo 40 caracteres.'
    )
  })

  // #################### AUTH HAS BEEN LISTED ######################
  test('Should return 200 if auth has been listed', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/auths/list/?id=auth_')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.equal(body[0].id, 'auth_')
    assert.equal(body[0].username, 'any_username')
    assert.equal(body[0].password, 'any_password')
    assert.equal(body[0].auth_type, 'userpass')
  })
})
