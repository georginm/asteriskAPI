import test from 'japa'
import supertest from 'supertest'

test.group('Aor controller - Store', (group) => {
  // ############################## ID ###############################
  test('Should return 404 if id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/')
      .send({
        contact: 'any_contact',
        max_contacts: 1,
      })
      .set('Accept', 'application/json')
      .expect(404)
    assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/aors/')
  })

  test('Should return 400 if id aor not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/not_e')
      .send({
        contact: 'any_contact',
      })
      .set('Accept', 'application/json')
      .expect(400)
    assert.equal(body[0].message, 'O registro de params.id não existe.')
  })

  test('Should return 400 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/exceed')
      .send({
        contact: 'any_contact',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo params.id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/aors/id')
      .send({
        contact: 'any_contact',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo params.id deve ser de no mínimo 3 caracteres.'
    )
  })
})
