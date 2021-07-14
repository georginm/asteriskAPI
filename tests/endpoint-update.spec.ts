import test from 'japa'
import supertest from 'supertest'

// #################################################################
// ###################### TEST GROUP - UPDATE ######################
// #################################################################
test.group('Endpoint Controller - Update', (group) => {
  test('Should return 400 if id endpoint not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_not_exists')
      .expect(400)
    assert.equal(body.message, 'Endpoint Not Exists')
  })

  test('Should return 404 if id endpoint was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints')
      .expect(404)
    assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/endpoints')
  })

  test('Should return 200 if endpoint has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({ context: 'any-context' })
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.exists(body)
  })
})
