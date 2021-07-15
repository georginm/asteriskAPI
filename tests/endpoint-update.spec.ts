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
  // ###############################################################

  // ##################### MAC ADDRESS #############################
  test('Should return 400 if address length does not match the specified pattern', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        mac_address: '01:23:45:67:89:AEE',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo mac_address deve ser de no máximo 17 caracteres.'
    )
  })

  test('Should return 400 if an invalid mac_address was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        mac_address: '01,23:45:67:89:ae',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo mac_address não corresponde com o padrão aceito.'
    )
  })

  test('Should return 400 if mac_address already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        mac_address: '01:23:45:67:89:AC',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo mac_address deve ser único.')
  })
  // ###############################################################

  // ############################## DENY ###########################
  test('Should return 400 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        deny: '154.145.142.9999',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo deny é invalido'
    )
  })

  test('Should return 400 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        deny: '154.145.142.999/266.254.215.25',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo deny é invalido'
    )
  })

  test('Should return 400 if deny exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        deny: '255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo deny deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 400 if deny is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        deny: '1.1.1.',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo deny deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ######################## CONTACT DENY #########################
  test('Should return 400 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_deny: '154.145.142.9999',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo contact_deny é invalido'
    )
  })

  test('Should return 400 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_deny: '154.145.142.999/266.254.215.25',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo contact_deny é invalido'
    )
  })

  test('Should return 400 if contact_deny exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_deny:
          '255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo contact_deny deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 400 if contact_deny is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_deny: '1.1.1.',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo contact_deny deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ########################### PERMIT ############################
  test('Should return 400 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        permit: '154.145.142.9999',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo permit é invalido'
    )
  })

  test('Should return 400 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        permit: '154.145.142.999/266.254.215.25',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo permit é invalido'
    )
  })

  test('Should return 400 if permit exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        permit:
          '255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo permit deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 400 if permit is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        permit: '1.1.1.',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo permit deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ####################### CONTACT PERMIT ########################
  test('Should return 400 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_permit: '154.145.142.9999',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo contact_permit é invalido'
    )
  })

  test('Should return 400 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_permit: '154.145.142.999/266.254.215.25',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'Um dos parâmetros informados no campo contact_permit é invalido'
    )
  })

  test('Should return 400 if contact_permit exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_permit:
          '255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo contact_permit deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 400 if contact_permit is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        contact_permit: '1.1.1.',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo contact_permit deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ######################## CALL GROUP ###########################
  test('Should return 400 if invalid callgroup was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        call_group: 'as',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo call_group deve conter um grupo válido.'
    )
  })

  test('Should return 400 if call_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        call_group: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo call_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### PICKUP GROUP ##########################
  test('Should return 400 if invalid pickup_group was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        pickup_group: 'as',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo pickup_group deve conter um grupo válido.'
    )
  })

  test('Should return 400 if pickup_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        pickup_group: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo pickup_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ###################### NAMED CALL GROUP #######################
  test('Should return 400 if named_call_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        named_call_group: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo named_call_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ###################### NAMED CALL GROUP #######################
  test('Should return 400 if named_pickup_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        named_pickup_group: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo named_pickup_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### OUTBOUND AUTH ########################
  test('Should return 400 if outbound_auth exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        outbound_auth: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo outbound_auth deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################
})
