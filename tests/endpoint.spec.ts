import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${String(process.env.HOST)}:${String(
  process.env.PORT
)}/api`

const before = async () => {
  await supertest(BASE_URL).post('/aors').send({ id: 'any_aor' })
  await supertest(BASE_URL).post('/auths').send({
    id: 'any_auth',
    auth_type: 'userpass',
    username: 'any_username',
    password: 'any_password',
  })

  await supertest(BASE_URL).post('/endpoints').send({
    id: 'id_exists',
    transport: 'transport-udp',
    aors: 'any_aor',
    auth: 'any_auth',
    context: 'from-internal',
    mac_address: 'any_mac_test',
  })
}

const after = async () => {
  await supertest(BASE_URL).delete('/aors/any_aor')
  await supertest(BASE_URL).delete('/auths/any_auth')
  await supertest(BASE_URL).delete('/endpoints/id_exists')
}

test.group('Endpoint Tests', () => {
  // #################################################################
  // ###################### TEST GROUP - STORE ######################
  // #################################################################
  test.group('Endpoint Controller - Store', (group) => {
    group.before(async () => {
      await before()
    })

    group.after(async () => {
      await after()
      await supertest(BASE_URL).delete('/endpoints/any_id')
    })

    test('Should return 400 if id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          transport: 'any_transport',
          aors: 'any_aor',
          auths: 'any_auths',
          context: 'any_context',
          mac_address: 'any_mac',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.exists(body)
    })

    test('Should return 400 if transport was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          aors: 'any_aor',
          auths: 'any_auths',
          context: 'any_context',
          mac_address: 'any_mac',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.exists(body)
    })

    test('Should return 400 if aors was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          transport: 'any_transport',
          auths: 'any_auths',
          context: 'any_context',
          mac_address: 'any_mac',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.exists(body)
    })

    test('Should return 400 if auth was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          transport: 'any_transport',
          aors: 'any_aor',
          context: 'any_context',
          mac_address: 'any_mac',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.exists(body)
    })

    test('Should return 400 if context was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          transport: 'any_transport',
          aors: 'any_aor',
          auth: 'any_auth',
          mac_address: 'any_mac',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.exists(body)
    })

    test('Should return 400 if mac_address was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          transport: 'any_transport',
          aors: 'any_aor',
          auth: 'any_auth',
          context: 'any_context',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.exists(body)
    })

    test('Should return 400 if provided aor does not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          transport: 'transport-udp',
          aors: 'not_exists',
          auth: 'any_aor',
          context: 'from-internal',
          mac_address: 'any_macs',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'Aor Not Exists')
    })

    test('Should return 400 if provided auth does not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          transport: 'transport-udp',
          aors: 'any_aor',
          auth: 'not_exists',
          context: 'from-internal',
          mac_address: 'any_mac_test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'Auth Not Exists')
    })

    test('Should return 201 if endpoint has been created', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any_id',
          transport: 'transport-udp',
          aors: 'any_aor',
          auth: 'any_auth',
          context: 'from-internal',
          mac_address: 'any_macs',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      assert.exists(body)
    })

    test('Should return 400 if endpoint id already exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'id_exists',
          transport: 'transport-udp',
          aors: 'any_aor',
          auth: 'any_auth',
          context: 'from-internal',
          mac_address: 'any_macs',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'Endpoint Already Exists')
    })
  })

  // #################################################################
  // ###################### TEST GROUP - LIST ########################
  // #################################################################
  test.group('Endpoint Controller - List', (group) => {
    group.before(async () => {
      await before()
    })

    group.after(async () => {
      await after()
    })

    test('Should return 200 if valid parameters are provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/endpoints/list/?context=from-internal')
        .expect(200)

      assert.exists(body)
    })

    test('Should return 400 if invalid parameters are provided', async (assert) => {
      const { body } = await supertest(BASE_URL).get(
        '/endpoints/list/?context=8574#bdDF'
      )
      assert.equal(body.message, 'Endpoints Not Exists')
    })
  })

  test.group('Endpoint Controller - Index', () => {
    test('Should return 200 if list endpoints', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/endpoints')
        .set('Accept', 'aplication/json')
        .expect(200)

      assert.exists(body)
    })
  })

  // #################################################################
  // ###################### TEST GROUP - UPDATE ######################
  // #################################################################
  test.group('Endpoint Controller - Update', (group) => {
    group.before(async () => {
      await before()
    })

    group.after(async () => {
      await after()
    })

    test('Should return 400 if id endpoint not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/endpoints/id_not_exists')
        .expect(400)
      assert.equal(body.message, 'Endpoint Not Exists')
    })

    test('Should return 404 if id endpoint was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL).put('/endpoints').expect(404)
      assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/endpoints')
    })

    test('Should return 200 if endpoint has been updated', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/endpoints/id_exists')
        .send({ context: 'any-context' })
        .set('Accept', 'aplication/json')
        .expect(200)

      assert.exists(body)
    })
  })

  // #################################################################
  // ###################### TEST GROUP - DELETE ######################
  // #################################################################
  test.group('Endpoint Controller - Delete', (group) => {
    group.before(async () => {
      await before()
    })

    group.after(async () => {
      await after()
    })

    test('Should return 200 if delete endpoints', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/endpoints/id_exists')
        .expect(200)
      assert.equal(body.message, 'Endpoint Has Been Deleted')
    })

    test('Should return 404 if id endpoint was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/endpoints')
        .expect(404)
      assert.equal(
        body.message,
        'E_ROUTE_NOT_FOUND: Cannot DELETE:/api/endpoints'
      )
    })

    test('Should return 400 if id endpoint not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/endpoints/id_not_exists')
        .expect(400)
      assert.equal(body.message, 'Endpoint Not Exists')
    })
  })
})
