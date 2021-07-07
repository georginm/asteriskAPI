import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${String(process.env.HOST)}:${String(
  process.env.PORT
)}/api`

test.group('Endpoint Controller - Store', () => {
  test('Should return 400 if id is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/endpoints')
      .send({
        transport: 'any_transport',
        aors: 'any_aors',
        auths: 'any_auths',
        context: 'any_context',
        mac_address: 'any_mac',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.exists(body)
  })

  test('Should return 400 if transport is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/endpoints')
      .send({
        id: 'any_id',
        aors: 'any_aors',
        auths: 'any_auths',
        context: 'any_context',
        mac_address: 'any_mac',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.exists(body)
  })

  test('Should return 400 if aors is not provided', async (assert) => {
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

  test('Should return 400 if auth is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/endpoints')
      .send({
        id: 'any_id',
        transport: 'any_transport',
        aors: 'any_aors',
        context: 'any_context',
        mac_address: 'any_mac',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.exists(body)
  })

  test('Should return 400 if context is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/endpoints')
      .send({
        id: 'any_id',
        transport: 'any_transport',
        aors: 'any_aors',
        auth: 'any_auth',
        mac_address: 'any_mac',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.exists(body)
  })

  test('Should return 400 if mac_adress is not provided', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/endpoints')
      .send({
        id: 'any_id',
        transport: 'any_transport',
        aors: 'any_aors',
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
        id: '200',
        transport: 'transport-udp',
        aors: 'not_exists',
        auth: '200',
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
        id: '200',
        transport: 'transport-udp',
        aors: '200',
        auth: 'not_exists',
        context: 'from-internal',
        mac_address: 'any_macs',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message, 'Auth Not Exists')
  })

  test('Should return 201 if endpoint is created', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/endpoints')
      .send({
        id: '200',
        transport: 'transport-udp',
        aors: '200',
        auth: '200',
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
        id: '200',
        transport: 'transport-udp',
        aors: '200',
        auth: '200',
        context: 'from-internal',
        mac_address: 'any_macs',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.exists(body)
  })
})

test.group('Endpoint Controller - List', () => {
  test('Should return 200 if valid parameters are provided', async () => {
    const { body } = await supertest(BASE_URL).get(
      '/endpoints/list/?context=from-internal'
    )
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
    const body = await supertest(BASE_URL)
      .get('/endpoints')
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.exists(body)
  })
})

test.group('Endpoint Controller - Delete', () => {
  test('Should return 200 if delete endpoints', async (assert) => {
    const message = await supertest(BASE_URL)
      .delete('/endpoints/200')
      .expect(200)
    assert.equal(message.body.message, 'Endpoint Has Been Deleted')
  })

  test('Should return 404 if id endpoint is not provided', async (assert) => {
    const message = await supertest(BASE_URL).delete('/endpoints').expect(404)
    assert.equal(
      message.body.message,
      'E_ROUTE_NOT_FOUND: Cannot DELETE:/api/endpoints'
    )
  })

  test('Should return 400 if id endpoint not exists', async (assert) => {
    const message = await supertest(BASE_URL)
      .delete('/endpoints/asdae!2@354*&6%')
      .expect(400)
    assert.equal(message.body.message, 'Endpoint Not Exists')
  })
})

