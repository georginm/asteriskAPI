import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api`

test.group('Auth Tests', () => {
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
  })
})
