import test from 'japa'
import supertest from 'supertest'

// #################################################################
// ###################### TEST GROUP - STORE ######################
// #################################################################

test.skip('Endpoint Controller - Store', (group) => {
  group.before(async () => {
    await supertest(process.env.BASE_URL).post('/aors').send({ id: 'aors2' })
    await supertest(process.env.BASE_URL).post('/auths').send({
      id: 'auth2',
      auth_type: 'userpass',
      username: 'any_username2',
      password: 'any_password2',
    })
  })

  group.after(async () => {
    await supertest(process.env.BASE_URL).delete('/aors/aors2')
    await supertest(process.env.BASE_URL).delete('/auths/auths2')
    await supertest(process.env.BASE_URL).delete('/endpoints/test')
  })

  // ####################### ID ##########################
  test('Should return 400 if id was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        transport: 'udp',
        aors: 'aors_',
        auth: 'auth_',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo id é obrigatório.')
  })

  test('Should return 400 if id exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_exeeds',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo id deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 400 if id is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo id deve ser de no mínimo 3 caracteres.'
    )
  })

  test('Should return 400 if endpoint id already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_ex',
        transport: 'udp',
        aors: 'aors_',
        auth: 'auth_',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:AA',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo id deve ser único.')
  })
  // ###############################################################

  // ######################### Transport ###########################

  test('Should return 400 if transport was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'uniq',
        aors: 'aors_',
        auth: 'auth_',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo transport é obrigatório.')
  })

  test('Should return 400 if transport provided not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'uniq',
        transport: 'wcq',
        aors: 'aors_',
        auth: 'auth_',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo transport deve ser 'udp,tcp,tls,ws,wss'."
    )
  })
  // ###############################################################

  // ######################### CONTEXT #############################
  test('Should return 400 if context was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo context é obrigatório.')
  })

  test('Should return 400 if context exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
  test('Should return 400 if disallow was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        context: 'any_context',
        aors: 'aors_',
        auth: 'auth_',
        mac_address: '01:23:45:67:89:AE',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo disallow é obrigatório.')
  })

  test('Should return 400 if disallow exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'teste',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'allsss,ssssss,sssss,sssss',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'teste',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'lsss asdasd asd asd',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'teste',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'alaw,tes',
        allow: 'alaw',
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

  // ########################## ALLOW ##############################
  test('Should return 400 if allow was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        context: 'any_context',
        aors: 'aors_',
        auth: 'auth_',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo allow é obrigatório.')
  })

  test('Should return 400 if allow exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'teste',
        mac_address: '01:23:45:67:89:AE',
        allow: 'allsss,ssssssssss,sssssss,',
        disallow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'teste',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'alaw',
        allow: 'alaw asds asdas',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'teste',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alsad',
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
  test('Should return 400 if aors was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        auth: 'auth_',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo aors é obrigatório.')
  })

  test('Should return 400 if aors exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2asda',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'ao',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        aors: 'not_e',
        auth: 'aors_',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:ab',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O registro de aors não existe.')
  })

  test('Should return 400 if provided aor already exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        aors: 'aors_',
        auth: 'aors_',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:ab',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo aors deve ser único.')
  })
  // ###############################################################

  // ########################### AUTH ##############################
  test('Should return 400 if auth was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        aors: 'aors2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo auth é obrigatório.')
  })

  test('Should return 400 if auth exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2test',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'au',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        aors: 'aors2',
        auth: 'not_e',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:AE_test',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O registro de auth não existe.')
  })

  // ###############################################################

  // ##################### MAC ADDRESS #############################
  test('Should return 400 if mac_address was not provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'cinco',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(body.message[0].message, 'O campo mac_address é obrigatório.')
  })

  test('Should return 400 if address length does not match the specified pattern', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AEE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01,23:45:67:89:ae',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AC',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'any',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        contact_permit: '255.64.2.199/145.8.218.54',
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
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        contact_permit: '255.64.2.199/145.8.218.54',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        contact_permit: '255.64.2.199/145.8.218.54',
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
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        contact_permit: '255.64.2.199/145.8.218.54',
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

  // ######################### CALLER ID ###########################
  test('Should return 400 if callerid exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        contact_permit: '255.64.2.199/145.8.218.54',
        callerid: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo callerid deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### OUTBOUND AUTH ########################
  test('Should return 400 if outbound_auth exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        contact_permit: '255.64.2.199/145.8.218.54',
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

  // ####################### OUTBOUND PROXY ########################
  test('Should return 400 if outbound_proxy exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        contact_permit: '255.64.2.199/145.8.218.54',
        outbound_proxy: '54,54,54,54,54,54,54,54,54,54,54,54,54,54',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo outbound_proxy deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### REWRITE CONTACT #######################
  test('Should return 400 if an invalid rewrite_contact was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        rewrite_contact: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo rewrite_contact deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################## RTP SYMMETRIC ########################
  test('Should return 400 if an invalid rtp_symmetric was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        rtp_symmetric: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo rtp_symmetric deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################## FORCE R PORT #########################
  test('Should return 400 if an invalid force_rport was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        force_rport: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo force_rport deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################## DIRECT MEDIA #########################
  test('Should return 400 if an invalid direct_media was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        direct_media: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo direct_media deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################### T38 UDP TL ##########################
  test('Should return 400 if an invalid t38_udptl was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        t38_udptl: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo t38_udptl deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ####################### T38 UDP TL NAT ########################
  test('Should return 400 if an invalid t38_udptl_nat was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        t38_udptl_nat: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo t38_udptl_nat deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ################# DISABLE DIRECT MEDIA ON NAT #################
  test('Should return 400 if an invalid disable_direct_media_on_nat was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        disable_direct_media_on_nat: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo disable_direct_media_on_nat deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################### ICE SUPPORT #########################
  test('Should return 400 if an invalid ice_support was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        ice_support: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo ice_support deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################## ALLOW OVERLAP ########################
  test('Should return 400 if an invalid allow_overlap was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        allow_overlap: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo allow_overlap deve ser 'yes,no'."
    )
  })
  // ###############################################################

  // ######################## DTMF MODE ########################
  test('Should return 400 if an invalid dtmf_mode was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        dtmf_mode: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      "O campo dtmf_mode deve ser 'rfc4733,inband,info,auto,auto_info'."
    )
  })
  // ###############################################################

  // ######################## RTP TIMEOUT ########################
  test('Should return 400 if an invalid rtp_timeout was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        rtp_timeout: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo rtp_timeout deve ser numérico.'
    )
  })
  // ###############################################################

  // ###################### RTP TIMEOUT HOLD #######################
  test('Should return 400 if an invalid rtp_timeout_hold was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        rtp_timeout_hold: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo rtp_timeout_hold deve ser numérico.'
    )
  })
  // ###############################################################

  // ###################### RTP TIMEOUT HOLD #######################
  test('Should return 400 if an invalid rtp_timeout_hold was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        rtp_timeout_hold: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo rtp_timeout_hold deve ser numérico.'
    )
  })
  // ###############################################################

  // ####################### RTP KEEPALIVE #########################
  test('Should return 400 if an invalid rtp_keepalive was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        rtp_keepalive: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo rtp_keepalive deve ser numérico.'
    )
  })
  // ###############################################################

  // #################### TIMERS SESS EXPIRES ######################
  test('Should return 400 if an invalid timers_sess_expires was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        timers_sess_expires: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo timers_sess_expires deve ser numérico.'
    )
  })
  // ###############################################################

  // #################### DEVICE STATE BUSY AT #####################
  test('Should return 400 if an invalid device_state_busy_at was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'id_',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'any_context',
        mac_address: '01:23:45:67:89:AE',
        disallow: 'all',
        allow: 'alaw',
        device_state_busy_at: 'maybe',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)

    assert.equal(
      body.message[0].message,
      'O campo device_state_busy_at deve ser numérico.'
    )
  })
  // ###############################################################

  // ################# ENDPOINT HAS BEEN CREATED ###################
  test('Should return 201 if endpoint has been created', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .post('/endpoints')
      .send({
        id: 'test',
        transport: 'udp',
        aors: 'aors2',
        auth: 'auth2',
        context: 'from-internal',
        mac_address: '01:23:45:67:89:B4',
        disallow: 'all',
        allow: 'alaw',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    // assert.equal(body.message[0].message, 'O registro de auth não existe.')
    assert.equal(body.id, 'test')
    assert.equal(body.transport, 'udp')
    assert.equal(body.aors, 'aors2')
    assert.equal(body.auth, 'auth2')
    assert.equal(body.context, 'from-internal')
    assert.equal(body.mac_address, '01:23:45:67:89:B4')
    assert.equal(body.disallow, 'all')
    assert.equal(body.allow, 'alaw')
  })
})
