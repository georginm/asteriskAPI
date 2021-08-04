import test from 'japa'
import supertest from 'supertest'

test.group('Aor Controller - Delete', (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/aors').send({ id: 'aors3' })
  })

  group.after(async () => {
    await supertest(process.env.BASE_URL).delete('/aors/aors3')
  })

  // ############################## ID ###############################
  test('Should return 404 if id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/')
      .set('Accept', 'application/json')
      .expect(404)
    assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/aors/')
  })

  test('Should return 400 if id aor not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/not_e')
      .set('Accept', 'application/json')
      .expect(400)
    assert.equal(body.message, 'O registro de id não existe.')
  })

  test('Should return 422 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/exceed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo params.id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 422 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo params.id deve ser de no mínimo 3 caracteres.'
    )
  })

  test('Should return 200 if aor has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .delete('/aors/aors3')
      .set('Accept', 'application/json')
      .expect(200)

    assert.equal(body.message, 'aor has been deleted')
  })
})
