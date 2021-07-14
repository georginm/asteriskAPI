import test from 'japa'
import supertest from 'supertest'

// #################################################################
// ###################### TEST GROUP - UPDATE ######################
// #################################################################
test.group('Endpoint Controller - Update', (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/aors').send({ id: 'exist' })
    await supertest(process.env.BASE_URL).post('/auths').send({
      id: 'exist',
      auth_type: 'userpass',
      username: 'any_user',
      password: 'any_password2',
    })
  })

  group.after(async () => {
    await supertest(process.env.BASE_URL).delete('/aors/exist')
    await supertest(process.env.BASE_URL).delete('/auths/exist')
  })

  // ############################## ID ###############################
  test('Should return 400 if id endpoint not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/any_i')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    assert.equal(body.message[0].message, 'O registro de params.id não existe.')
  })

  test('Should return 404 if id endpoint was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints')
      .expect(404)
    assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/endpoints')
  })

  test('Should return 400 if id exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/exceeed')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo params.id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo params.id deve ser de no mínimo 3 caracteres.'
    )
  })

  // ######################### Transport #############################
  test('Should return 400 if transport provided not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        transport: 'wcq',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo transport deve ser 'udp,tcp,tls,ws,wss'."
    )
  })

  test('Should return 200 if trasport has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({ transport: 'tcp' })
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.equal(body.transport, 'tcp')
  })
  // #################################################################

  // ######################### CONTEXT #############################
  test('Should return 400 if context exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        context: 'testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo context deve ser de no máximo 40 caracteres.'
    )
  })

  test('Should return 200 if context has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({ context: 'any-context' })
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.equal(body.context, 'any-context')
  })
  // ###############################################################

  // ######################## DISALLOW #############################
  test('Should return 400 if disallow exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        disallow: 'allsss,ssssss,sssss,sssss',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo disallow deve ser de no máximo 20 caracteres.'
    )
  })

  test('Should return 400 if an invalid disallow was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        disallow: 'lsss asdasd asd asd',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo disallow não corresponde com o padrão aceito.'
    )
  })

  test('Should return 400 if an invalid codec was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        disallow: 'alaw,tes',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo disallow deve conter um codec válido.'
    )
  })

  test('Should return 200 if disallow has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({ disallow: 'gsm' })
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.equal(body.disallow, 'gsm')
  })
  // ###############################################################

  // ######################## ALLOW #############################
  test('Should return 400 if allow exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        allow: 'allsss,ssssss,sssss,sssss',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo allow deve ser de no máximo 20 caracteres.'
    )
  })

  test('Should return 400 if an invalid allow was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        allow: 'lsss asdasd asd asd',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo allow não corresponde com o padrão aceito.'
    )
  })

  test('Should return 400 if an invalid codec was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        allow: 'alaw,tes',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo allow deve conter um codec válido.'
    )
  })

  test('Should return 200 if allow has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({ allow: 'ulaw' })
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.equal(body.allow, 'ulaw')
  })
  // ###############################################################

  // ########################## AORS ###############################
  test('Should return 400 if aors exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        aors: 'aors2asda',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo aors deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if aors is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        aors: 'ao',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo aors deve ser de no mínimo 3 caracteres.'
    )
  })

  test('Should return 400 if provided aor does not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        aors: 'not_e',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O registro de aors não existe.')
  })

  test('Should return 400 if provided aor already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        aors: 'aors_',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo aors deve ser único.')
  })

  test('Should return 200 if aors has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({ aors: 'exist' })
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.equal(body.aors, 'exist')
  })
  // ###############################################################

  // ########################### AUTH ##############################
  test('Should return 400 if auth exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        auth: 'auth2test',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo auth deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if auth is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        auth: 'au',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo auth deve ser de no mínimo 3 caracteres.'
    )
  })

  test('Should return 400 if provided auth does not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        auth: 'not_e',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O registro de auth não existe.')
  })

  test('Should return 200 if auth has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({ auth: 'exist' })
      .set('Accept', 'aplication/json')
      .expect(200)

    assert.equal(body.auth, 'exist')
  })
  // ###############################################################
})
