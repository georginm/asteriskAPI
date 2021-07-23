import test from 'japa'
import supertest from 'supertest'

test.skip('Aor controller - Store', (group) => {
  group.after(async () => {
    await supertest(process.env.BASE_URL).delete('/aors/6666')
  })

  // ############################## ID ###############################
  test('Should return 400 if id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        contact: 'any_contact',
        max_contacts: 1,
      })
      .set('Accept', 'application/json')
      .expect(400)

    assert.equal(body[0].message, 'O campo id é obrigatório.')
  })

  test('Should return 400 if id aor already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: 'aors_',
      })
      .set('Accept', 'application/json')
      .expect(400)

    assert.equal(body[0].message, 'O campo id deve ser único.')
  })

  test('Should return 400 if id exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: 'id_exceeds',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: 'id',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no mínimo 3 caracteres.'
    )
  })

  test('Should return 400 if id receives a number', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: 144,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo id deve ser de texto.')
  })

  // ########################## CONTACT ##############################
  test('Should return 400 if contact receives a number', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: 'teste',
        contact: 144,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo contact deve ser de texto.')
  })

  test('Should return 400 if contact exceed the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: 'test',
        contact:
          'exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed,,,,exceed',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo contact deve ser de no máximo 255 caracteres.'
    )
  })

  // ####################### MAX CONTACTS ############################
  test('Should return 400 if maxContacts receives a number', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: 'teste',
        maxContacts: '1sdasd',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo maxContacts deve ser numérico.')
  })

  test('Should return 201 if aor has been created', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/aors')
      .send({
        id: '6666',
        contact: 'any_contact',
        maxContacts: 1,
      })
      .set('Accept', 'application/json')
      .expect(201)

    assert.equal(body.id, '6666')
    assert.equal(body.contact, 'any_contact')
    assert.equal(body.max_contacts, 1)
  })
})
