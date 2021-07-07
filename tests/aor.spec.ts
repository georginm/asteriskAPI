import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${String(process.env.HOST)}:${String(
  process.env.PORT
)}/api`

test.group('Aor Test', () => {
  test.group('Aor Controller - Index', () => {
    test('Sould return 200 if list aors', async (asserts) => {
      const { body } = await supertest(BASE_URL)
        .get('/aors')
        .set('Accept', 'aplication/json')
        .expect(200)
      asserts.exists(body)
    })
  })
})
