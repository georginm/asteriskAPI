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

  test.group('Aor controller - Store', () => {
    test('Should return 400 if id is not provided', async (asserts) => {
      const { body } = await supertest(BASE_URL)
        .post('/aors')
        .send({
          contact: 'any_contact',
          max_contacts: 1,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      asserts.equal(body.message, 'Aor id not provided')
    })

    test('Should return 400 if id aor already exists', async (asserts) => {
      const { body } = await supertest(BASE_URL)
        .post('/aors')
        .send({
          id: 200,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      asserts.equal(body.message, 'Aor Already Exists')
    })
  })
})
