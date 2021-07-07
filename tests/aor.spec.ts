import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${String(process.env.HOST)}:${String(
  process.env.PORT
)}/api`

test.group('Aor Test', () => {
  test.group('Aor Controller - Index', () => {
    test('Sould return 200 if list aors', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/aors')
        .set('Accept', 'aplication/json')
        .expect(200)
      assert.exists(body)
    })
  })

  test.group('Aor controller - Store', (group) => {
    group.before(async () => {
      await supertest(BASE_URL).post('/aors').send({
        id: '9999999999',
        max_contacts: 3,
        contact: 'any_contact',
      })
      await supertest(BASE_URL).delete('/aors/6666666666')
    })

    group.after(async () => {
      await supertest(BASE_URL).delete('/aors/6666666666')
      await supertest(BASE_URL).delete('/aors/9999999999')
    })

    test('Should return 400 if id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/aors')
        .send({
          contact: 'any_contact',
          max_contacts: 1,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'Aor id not provided')
    })

    test('Should return 201 if aor has been created', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/aors')
        .send({
          id: '6666666666',
          contact: 'any_contact',
          max_contacts: 1,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

      assert.exists(body)
    })

    test('Should return 400 if id aor already exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/aors')
        .send({
          id: '9999999999',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'Aor Already Exists')
    })
  })

  test.group('Aor Controller - Update', (group) => {
    group.before(async () => {
      await supertest(BASE_URL).post('/aors').send({ id: '9999999999' })
    })

    group.after(async () => {
      await supertest(BASE_URL).delete('/aors/9999999999')
    })

    test('Should return 404 if id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/aors')
        .send({
          max_contacts: 6,
          contact: 'any_changes',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)

      assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/aors')
    })

    test('Should return 400 if id provided not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/aors/&hgy%645s$')
        .send({
          max_contacts: 6,
          contact: 'any_changes',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.equal(body.message, 'Aor Not Exists')
    })

    test('Should return 200 if aor has been updated', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/aors/9999999999')
        .send({
          max_contacts: 6,
          contact: 'any_changes',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assert.exists(body)
    })
  })

  test.group('Aor Controller - Delete', (group) => {
    group.before(async () => {
      await supertest(BASE_URL).post('/aors').send({ id: '9999999999' })
    })

    group.after(async () => {
      await supertest(BASE_URL).delete('/aors/9999999999')
    })

    test('Should return 404 if id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/aors')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)

      assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot DELETE:/api/aors')
    })

    test('Should return 400 if id provided not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/aors/&hgy%645s$')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)

      assert.exists(body)
    })

    test('Should return 200 if aor has been deleted', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/aors/9999999999')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

      assert.exists(body.message, 'Aor Has Been Deleted')
    })
  })
})
