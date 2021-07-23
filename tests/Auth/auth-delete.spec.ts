import test from 'japa'
import supertest from 'supertest'

test.group('Auth Controller - Delete', (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/auths').send({
      id: 'any_',
      username: 'any',
      password: 'any',
    })
  })

  test('Should return 404 if id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .delete('/auths')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)

    assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot DELETE:/api/auths')
  })
})
