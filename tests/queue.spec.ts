import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${String(process.env.HOST)}:${String(
  process.env.PORT
)}/api`

test.group('Endpoint Controller Store', () => {
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

  test('Should return 201 if endpoint is created', async (assert) => {
    const { body } = await supertest(BASE_URL)
      .post('/endpoints')
      .send({
        id: '200',
        transport: 'transport-udp',
        aors: '200',
        auth: '200',
        context: 'from-internal',
        mac_address: 'any_mac',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    assert.exists(body)
  })
})
