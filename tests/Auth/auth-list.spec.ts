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

    assert.equal(body[0].message, 'O registro de id não existe.')
  })
})
