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
    assert.equal(body[0].message, 'O registro de params.id não existe.')
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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

    assert.equal(body[0].message, 'O campo allow deve conter um codec válido.')
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
      body[0].message,
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
      body[0].message,
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

    assert.equal(body[0].message, 'O registro de aors não existe.')
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

    assert.equal(body[0].message, 'O campo aors deve ser único.')
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
      body[0].message,
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
      body[0].message,
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

    assert.equal(body[0].message, 'O registro de auth não existe.')
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
      body[0].message,
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
      body[0].message,
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

    assert.equal(body[0].message, 'O campo mac_address deve ser único.')
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
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
      body[0].message,
      'O campo outbound_auth deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### OUTBOUND PROXY ########################
  test('Should return 400 if outbound_proxy exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        outbound_proxy: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo outbound_proxy deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ######################## RTP SYMMETRIC #########################
  test('Should return 400 if an invalid rtp_symmetric was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        rtp_symmetric: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, "O campo rtp_symmetric deve ser 'yes,no'.")
  })
  // ###############################################################

  // ######################## FORCE R PORT #########################
  test('Should return 400 if an invalid force_rport was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        force_rport: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, "O campo force_rport deve ser 'yes,no'.")
  })
  // ###############################################################

  // ######################## DIRECT MEDIA #########################
  test('Should return 400 if an invalid direct_media was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        direct_media: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, "O campo direct_media deve ser 'yes,no'.")
  })
  // ###############################################################

  // ######################### T38 UDP TL ##########################
  test('Should return 400 if an invalid t38_udptl was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        t38_udptl: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, "O campo t38_udptl deve ser 'yes,no'.")
  })
  // ###############################################################

  // ####################### T38 UDP TL NAT ########################
  test('Should return 400 if an invalid t38_udptl_nat was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        t38_udptl_nat: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, "O campo t38_udptl_nat deve ser 'yes,no'.")
  })
  // ###############################################################

  // ################# DISABLE DIRECT MEDIA ON NAT #################
  test('Should return 400 if an invalid disable_direct_media_on_nat was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        disable_direct_media_on_nat: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      "O campo disable_direct_media_on_nat deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################### ICE SUPPORT #########################
  test('Should return 400 if an invalid ice_support was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        ice_support: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, "O campo ice_support deve ser 'yes,no'.")
  })
  // ###############################################################

  // ######################## ALLOW OVERLAP ########################
  test('Should return 400 if an invalid allow_overlap was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        allow_overlap: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, "O campo allow_overlap deve ser 'yes,no'.")
  })
  // ###############################################################

  // ######################## DTMF MODE ########################
  test('Should return 400 if an invalid dtmf_mode was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        dtmf_mode: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      "O campo dtmf_mode deve ser 'rfc4733,inband,info,auto,auto_info'."
    )
  })
  // ###############################################################

  // ######################## RTP TIMEOUT ########################
  test('Should return 400 if an invalid rtp_timeout was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        rtp_timeout: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo rtp_timeout deve ser numérico.')
  })
  // ###############################################################

  // ###################### RTP TIMEOUT HOLD #######################
  test('Should return 400 if an invalid rtp_timeout_hold was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        rtp_timeout_hold: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo rtp_timeout_hold deve ser numérico.')
  })
  // ###############################################################

  // ###################### RTP TIMEOUT HOLD #######################
  test('Should return 400 if an invalid rtp_timeout_hold was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        rtp_timeout_hold: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo rtp_timeout_hold deve ser numérico.')
  })
  // ###############################################################

  // ####################### RTP KEEPALIVE #########################
  test('Should return 400 if an invalid rtp_keepalive was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        rtp_keepalive: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body[0].message, 'O campo rtp_keepalive deve ser numérico.')
  })
  // ###############################################################

  // #################### TIMERS SESS EXPIRES ######################
  test('Should return 400 if an invalid timers_sess_expires was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        timers_sess_expires: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo timers_sess_expires deve ser numérico.'
    )
  })
  // ###############################################################

  // #################### DEVICE STATE BUSY AT #####################
  test('Should return 400 if an invalid device_state_busy_at was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        device_state_busy_at: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body[0].message,
      'O campo device_state_busy_at deve ser numérico.'
    )
  })
  // ###############################################################

  //################# ENDPOINT HAS BEEN UPDATED ####################
  test('Should return 200 if endpoint has been updated', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .put('/endpoints/id_ex')
      .send({
        transport: 'udp',
        aors: 'exist',
        auth: 'exist',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        deny: '100.251.136.36',
        permit: '100.251.136.36',
        contact_deny: '100.251.136.36',
        contact_permit: '100.251.136.36',
        call_group: '45',
        pickup_group: '45',
        named_call_group: 'any_name',
        named_pickup_group: 'any_name',
        callerid: '999999999',
        outbound_auth: 'my_trunk',
        outbound_proxy: 'proxy_trunk',
        rewrite_contact: 'yes',
        force_rport: 'yes',
        rtp_symmetric: 'yes',
        direct_media: 'yes',
        t38_udptl: 'yes',
        t38_udptl_nat: 'yes',
        disable_direct_media_on_nat: 'yes',
        ice_support: 'yes',
        allow_overlap: 'yes',
        dtmf_mode: 'auto',
        rtp_timeout: 15,
        rtp_timeout_hold: 15,
        rtp_keepalive: 15,
        timers_sess_expires: 15,
        device_state_busy_at: 15,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.equal(body.transport, 'udp')
    assert.equal(body.aors, 'exist')
    assert.equal(body.auth, 'exist')
    assert.equal(body.context, 'any_context')
    assert.equal(body.mac_address, '01:23:45:67:89:AE')
    assert.equal(body.disallow, 'all')
    assert.equal(body.allow, 'alaw')
    assert.equal(body.deny, '100.251.136.36')
    assert.equal(body.permit, '100.251.136.36')
    assert.equal(body.contact_deny, '100.251.136.36')
    assert.equal(body.contact_permit, '100.251.136.36')
    assert.equal(body.call_group, '45')
    assert.equal(body.pickup_group, '45')
    assert.equal(body.named_call_group, 'any_name')
    assert.equal(body.named_pickup_group, 'any_name')
    assert.equal(body.callerid, '999999999')
    assert.equal(body.outbound_auth, 'my_trunk')
    assert.equal(body.outbound_proxy, 'proxy_trunk')
    assert.equal(body.rewrite_contact, 'yes')
    assert.equal(body.force_rport, 'yes')
    assert.equal(body.direct_media, 'yes')
    assert.equal(body.t38_udptl, 'yes')
    assert.equal(body.t38_udptl_nat, 'yes')
    assert.equal(body.disable_direct_media_on_nat, 'yes')
    assert.equal(body.ice_support, 'yes')
    assert.equal(body.allow_overlap, 'yes')
    assert.equal(body.dtmf_mode, 'auto')
    assert.equal(body.rtp_timeout, 15)
    assert.equal(body.rtp_timeout_hold, 15)
    assert.equal(body.rtp_keepalive, 15)
    assert.equal(body.timers_sess_expires, 15)
    assert.equal(body.device_state_busy_at, 15)
  })
})
