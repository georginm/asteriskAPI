import test from 'japa'
import supertest from 'supertest'

test.group('Aor controller - List', (group) => {
  group.after(async () => {
    await supertest(process.env.BASE_URL).delete('/aors/6666')
  })

  // ############################## ID ###############################
  test('Should return 400 if id aor not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/aors/list/?id=not_e')
      .set('Accept', 'application/json')
      .expect(400)

    assert.equal(body.message, 'O registro de id não existe.')
  })

  test('Should return 422 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/aors/list/?id=exceeed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 422 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/aors/list/?id=id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no mínimo 3 caracteres.'
    )
  })

  // ########################## CONTACT ##############################
  test('Should return 422 if contact exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/aors/list/?contact=exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo contact deve ser de no máximo 255 caracteres.'
    )
  })

  // ####################### MAX CONTACTS ############################
  test('Should return 422 if maxContacts receives a string', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/aors/list/?maxContacts=asdas')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(body[0].message, 'O campo maxContacts deve ser numérico.')
  })

  // ####################### AORS WAS LISTED #########################
  test('Should return 200 if aor was listed', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/aors/list/?id=aors_')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.equal(body[0].id, 'aors_')
  })
})
