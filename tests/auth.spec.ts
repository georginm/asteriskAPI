import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

test.skip('Auth Tests', () => {
  test.group('Auth Controller - Index', () => {
    test('Should return 200 if list auths', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/auths')
        .set('Accept', 'aplication/json')
        .expect(200)
      assert.exists(body)
    })
  })

  test.group('Auth Controller - Store', (group) => {
    group.before(async () => {
      await supertest(BASE_URL).post('/auths').send({
        id: 'id',
        auth_type: 'userpass',
        username: 'username',
        password: 'password',
      })
    })

    group.after(async () => {
      await supertest(BASE_URL).delete('/auths/any_id')
      await supertest(BASE_URL).delete('/auths/id')
    })

    test('Should return 400 if id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/auths')
        .send({
          auth_type: 'userpass',
          username: 'any_username',
          password: 'any_password',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'id was not provided')
    })

    test('Should return 400 if username was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/auths')
        .send({
          id: 'any_id',
          auth_type: 'userpass',
          password: 'any_password',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'username was not provided')
    })

    test('Should return 400 if auth_type was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/auths')
        .send({
          id: 'any_id',
          username: 'any_username',
          password: 'any_password',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'auth_type was not provided')
    })

    test('Should return 400 if password was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/auths')
        .send({
          id: 'any_id',
          auth_type: 'userpass',
          username: 'any_username',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'password was not provided')
    })

    test('Should return 400 if auth id already exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/auths')
        .send({
          id: 'id',
          auth_type: 'userpass',
          username: 'username',
          password: 'password',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'auth id already exists')
    })

    test('Should return 400 if auth username already exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/auths')
        .send({
          id: 'any_id',
          auth_type: 'userpass',
          username: 'username',
          password: 'password',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'auth username already exists')
    })

    test('Should return 201 if auth has been created', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/auths')
        .send({
          id: 'any_id',
          auth_type: 'userpass',
          username: 'any_username',
          password: 'password',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      assert.exists(body)
    })
  })

  test.group('Auth Controller - Update', (group) => {
    group.before(async () => {
      await supertest(BASE_URL).post('/auths').send({
        id: 'any_id',
        auth_type: 'userpass',
        username: 'any_username',
        password: 'password',
      })
    })

    group.after(async () => {
      await supertest(BASE_URL).delete('/auths/any_id')
    })

    test('Should return 400 if username provided already exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/auths/any_id')
        .send({
          username: 'any_username',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'username provided already exists')
    })

    test('Should return 400 if auth id provided not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/auths/invalid_id')
        .send({
          username: 'username',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'auth not exists')
    })

    test('Should return 404 if auth id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/auths')
        .send({
          username: 'username',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)

      assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/auths')
    })

    test('Should return 200 if auth has been updated', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/auths/any_id')
        .send({
          username: 'valid_username',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assert.exists(body)
    })
  })

  test.group('Auth Controller - Delete', (group) => {
    group.before(async () => {
      await supertest(BASE_URL).post('/auths').send({
        id: 'id',
        auth_type: 'userpass',
        username: 'username',
        password: 'password',
      })
    })

    test('Should return 404 if id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/auths')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)

      assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot DELETE:/api/auths')
    })

    test('Should return 400 if id provided not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/auths/invalid_id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'auth not exists')
    })

    test('Should return 200 if aor has been deleted', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/auths/id')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assert.equal(body.message, 'auth has been deleted')
    })
  })

  test.group('Auth Controller - List', (group) => {
    group.before(async () => {
      await supertest(BASE_URL).post('/auths').send({
        id: 'any_id',
        auth_type: 'userpass',
        username: 'any_username',
        password: 'password',
      })
    })

    group.after(async () => {
      await supertest(BASE_URL).delete('/auths/any_id')
    })

    test('Should return 400 is query params provided are invalid', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/auths/list/?id=invalid_id')
        .set('Accept', 'aplication/json')
        .expect(400)
      assert.exists(body)
    })

    test('Should return 200 is list auths', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/auths/list/?id=any_id')
        .set('Accept', 'aplication/json')
        .expect(200)
      assert.exists(body)
    })
  })
})
