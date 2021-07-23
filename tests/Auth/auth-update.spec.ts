import test from 'japa'
import supertest from 'supertest'

test.group('Auth Controller - Update', () => {
  // ############################### ID ##############################
  test('Should return 400 if auth id provided not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/auths/inval')
      .send({
        username: 'username',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O registro de params.id não existe.')
  })

})
