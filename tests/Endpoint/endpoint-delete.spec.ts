import test from 'japa'
import supertest from 'supertest'

test.group('Endpoint - Delete', async (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/aors').send({ id: 'exist' })
    await supertest(process.env.BASE_URL).post('/auths').send({
      id: 'exist',
      auth_type: 'userpass',
      username: 'any_user',
      password: 'any_password2',
    })
    await supertest(process.env.BASE_URL).post('/endpoints').send({
      id: 'exist',
      transport: 'udp',
      aors: 'exist',
      auth: 'exist',
      context: 'from-internal',
      mac_address: '01:23:45:67:89:B4',
      disallow: 'all',
      allow: 'alaw',
    })
  })

  group.after(async () => {
    await supertest(process.env.BASE_URL).delete('/aors/exist')
    await supertest(process.env.BASE_URL).delete('/auths/exist')
  })

  // ############################## ID ###############################
  test('Should return 400 if id endpoint not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .delete('/endpoints/any_i')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    assert.equal(body.message[0].message, 'O registro de params.id não existe.')
  })

  test('Should return 404 if id endpoint was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .delete('/endpoints')
      .expect(404)
    assert.equal(
      body.message,
      'E_ROUTE_NOT_FOUND: Cannot DELETE:/api/endpoints'
    )
  })

  test('Should return 400 if id exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .delete('/endpoints/exceeed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo params.id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .delete('/endpoints/id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo params.id deve ser de no mínimo 3 caracteres.'
    )
  })

  test('Should return 200 if the item was deleted successfully', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .delete('/endpoints/exist')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.equal(body.message, 'Endpoint Has Been Deleted')
  })
})
