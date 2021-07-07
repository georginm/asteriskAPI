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
})
