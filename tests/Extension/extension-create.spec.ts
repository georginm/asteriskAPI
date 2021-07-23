import test from 'japa'
import supertest from 'supertest'

test.group('Extension Controller - Store', async (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/extensions').send({
      context: 'context',
      exten: '*100',
      priority: 1,
      app: 'answer',
      appdata: 'a',
    })
  })

  // group.after(async () => {
  //   await supertest(process.env.BASE_URL).delete('/extensions')
  // })

  // ############################ CONTEXT ############################
  test('Should return 400 if context was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        exten: '*100',
        priority: 1,
        app: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo context é obrigatório.')
  })

  test('Should return 400 if context exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        context: 'any_test-any_test-any_test-any_test-any_test-',
        exten: '*100',
        priority: 1,
        app: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo context deve ser de no máximo 40 caracteres.'
    )
  })

  // ########################### EXTEN ###############################
  test('Should return 400 if exten was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        context: 'any_context',
        priority: 1,
        app: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo exten é obrigatório.')
  })

  test('Should return 400 if exten exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        exten: 'any_test-any_test-any_test-any_test-any_test-',
        context: '*100',
        priority: 1,
        app: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo exten deve ser de no máximo 40 caracteres.'
    )
  })

  // ########################## PRIORITY #############################
  test('Should return 400 if priority field provided was a string', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        exten: 'any_test',
        context: '*100',
        priority: 'asdas',
        app: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo priority deve ser numérico.')
  })

  // ########################### APP ###############################
  test('Should return 400 if app was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        context: 'any_context',
        priority: 1,
        exten: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo app é obrigatório.')
  })

  test('Should return 400 if app exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        app: 'any_test-any_test-any_test-any_test-any_test-',
        context: '*100',
        priority: 1,
        exten: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo app deve ser de no máximo 40 caracteres.'
    )
  })

  // ########################### APPDATA #############################
  test('Should return 400 if appdata was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        context: 'any_context',
        priority: 1,
        exten: 'answer',
        app: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo appdata é obrigatório.')
  })

  test('Should return 400 if appdata exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        appdata:
          'test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-any_test-',
        context: '*100',
        priority: 1,
        exten: 'answer',
        app: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo appdata deve ser de no máximo 256 caracteres.'
    )
  })

  // ################## CONTEXT, EXTEN AND PRIORITY ##################
  test('Should return 400 if there is already an extension registered with the same context, exten and priority ', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        context: 'context',
        exten: '*100',
        priority: 1,
        app: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo priority deve ser único no relacionamento.'
    )
  })

  // ################## EXTENSION HAS BEEN CREATED ###################
  test('Should return 201 if extension has been created', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/extensions')
      .send({
        context: 'any_context',
        exten: '*100',
        priority: 1,
        app: 'answer',
        appdata: 'a',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    assert.equal(body.context, 'any_context')
    assert.equal(body.exten, '*100')
    assert.equal(body.priority, 1)
    assert.equal(body.app, 'answer')
    assert.equal(body.appdata, 'a')
  })
})
