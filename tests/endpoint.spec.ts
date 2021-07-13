import test from 'japa'
import supertest from 'supertest'

const BASE_URL = `http://${String(process.env.HOST)}:${String(
  process.env.PORT
)}/api`

const before = async () => {
  await supertest(BASE_URL).post('/aors').send({ id: 'aors_' })
  await supertest(BASE_URL).post('/auths').send({
    id: 'auth_',
    auth_type: 'userpass',
    username: 'any_username',
    password: 'any_password',
  })

  await supertest(BASE_URL).post('/endpoints').send({
    id: 'id_ex',
    transport: 'udp',
    aors: 'aors_',
    auth: 'auth_',
    context: 'from-internal',
    mac_address: '01:23:45:67:89:AC',
    disallow: 'all',
    allow: 'alaw',
  })
}

const after = async () => {
  await supertest(BASE_URL).delete('/aors/aors_')
  await supertest(BASE_URL).delete('/auths/auth_')
  await supertest(BASE_URL).delete('/endpoints/id_ex')
}

test.group('Endpoint Tests', () => {
  // #################################################################
  // ###################### TEST GROUP - STORE ######################
  // #################################################################

  test.group('Endpoint Controller - Store', (group) => {
    group.before(async () => {
      await before()
      await supertest(BASE_URL).post('/aors').send({ id: 'aors2' })
      await supertest(BASE_URL).post('/auths').send({
        id: 'auth2',
        auth_type: 'userpass',
        username: 'any_username2',
        password: 'any_password2',
      })
    })

    group.after(async () => {
      await after()
      await supertest(BASE_URL).delete('/aors/aors2')
      await supertest(BASE_URL).delete('/auths/auth2')
      await supertest(BASE_URL).delete('/endpoints/test')
    })

    // ####################### ID ##########################
    test('Should return 400 if id was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          transport: 'udp',
          aors: 'aors_',
          auths: 'auth_',
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'id_exeeds',
          transport: 'udp',
          aors: 'aors2',
          auths: 'auth2',
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'id',
          transport: 'udp',
          aors: 'aors2',
          auths: 'auth2',
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'uniq',
          aors: 'aors_',
          auths: 'auth_',
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'uniq',
          transport: 'wcq',
          aors: 'aors_',
          auths: 'auth_',
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any',
          transport: 'udp',
          aors: 'aors2',
          auths: 'auth2',
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any',
          transport: 'udp',
          aors: 'aors2',
          auths: 'auth2',
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
      const { body } = await supertest(BASE_URL)
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
    // ###############################################################

    // ########################## ALLOW ##############################
    test('Should return 400 if allow was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any',
          transport: 'udp',
          aors: 'aors2',
          auths: 'auth2',
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'any',
          transport: 'udp',
          aors: 'aors2',
          auth: 'auth2',
          context: 'teste',
          mac_address: '01:23:45:67:89:AE',
          disallow: 'asd',
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
    // ###############################################################

    // ########################## AORS ###############################
    test('Should return 400 if aors was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'cinco',
          transport: 'udp',
          auths: 'auth_',
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'id_',
          transport: 'udp',
          aors: 'aors2asda',
          auths: 'auth2',
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
      const { body } = await supertest(BASE_URL)
        .post('/endpoints')
        .send({
          id: 'id_',
          transport: 'udp',
          aors: 'ao',
          auths: 'auth2',
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
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

      assert.equal(
        body.message[0].message,
        'O campo mac_address é obrigatório.'
      )
    })

    test('Should return 400 if address length does not match the specified pattern', async (assert) => {
      const { body } = await supertest(BASE_URL)
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
      const { body } = await supertest(BASE_URL)
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
    // ###############################################################

    test('Should return 201 if endpoint has been created', async (assert) => {
      const { body } = await supertest(BASE_URL)
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
      assert.exists(body)
    })
  })

  // #################################################################
  // ###################### TEST GROUP - LIST ########################
  // #################################################################
  test.group('Endpoint Controller - List', (group) => {
    group.before(async () => {
      await before()
    })

    group.after(async () => {
      await after()
    })

    test('Should return 200 if valid parameters are provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/endpoints/list/?context=from-internal')
        .expect(200)

      assert.exists(body)
    })

    test('Should return 400 if invalid parameters are provided', async (assert) => {
      const { body } = await supertest(BASE_URL).get(
        '/endpoints/list/?context=8574#bdDF'
      )
      assert.equal(body.message, 'Endpoints Not Exists')
    })
  })

  test.group('Endpoint Controller - Index', () => {
    test('Should return 200 if list endpoints', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .get('/endpoints')
        .set('Accept', 'aplication/json')
        .expect(200)

      assert.exists(body)
    })
  })

  // #################################################################
  // ###################### TEST GROUP - UPDATE ######################
  // #################################################################
  test.group('Endpoint Controller - Update', (group) => {
    group.before(async () => {
      await before()
    })

    group.after(async () => {
      await after()
    })

    test('Should return 400 if id endpoint not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/endpoints/id_not_exists')
        .expect(400)
      assert.equal(body.message, 'Endpoint Not Exists')
    })

    test('Should return 404 if id endpoint was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL).put('/endpoints').expect(404)
      assert.equal(body.message, 'E_ROUTE_NOT_FOUND: Cannot PUT:/api/endpoints')
    })

    test('Should return 200 if endpoint has been updated', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .put('/endpoints/id_ex')
        .send({ context: 'any-context' })
        .set('Accept', 'aplication/json')
        .expect(200)

      assert.exists(body)
    })
  })

  // #################################################################
  // ###################### TEST GROUP - DELETE ######################
  // #################################################################
  test.group('Endpoint Controller - Delete', (group) => {
    group.before(async () => {
      await before()
    })

    group.after(async () => {
      await after()
    })

    test('Should return 200 if delete endpoints', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/endpoints/id_ex')
        .expect(200)
      assert.equal(body.message, 'Endpoint Has Been Deleted')
    })

    test('Should return 404 if id endpoint was not provided', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/endpoints')
        .expect(404)
      assert.equal(
        body.message,
        'E_ROUTE_NOT_FOUND: Cannot DELETE:/api/endpoints'
      )
    })

    test('Should return 400 if id endpoint not exists', async (assert) => {
      const { body } = await supertest(BASE_URL)
        .delete('/endpoints/id_not_exists')
        .expect(400)
      assert.equal(body.message, 'Endpoint Not Exists')
    })
  })
})
