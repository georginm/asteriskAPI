import supertest from 'supertest'
import test from 'japa'

// #################################################################
// ###################### TEST GROUP - LIST ######################
// #################################################################
test.group('Endpoint Controller - List', async () => {
  test('Should return 422 if id exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?id=exceeed')
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
      .get('/endpoints/list/?id=id')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo id deve ser de no mínimo 3 caracteres.'
    )
  })

  // ######################### Transport #############################
  test('Should return 422 if transport provided not exists', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?transport=wcq')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      "O campo transport deve ser 'udp,tcp,tls,ws,wss'."
    )
  })
  // #################################################################

  // ######################### CONTEXT #############################
  test('Should return 422 if context exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?context=testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo context deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ######################## DISALLOW #############################
  test('Should return 422 if disallow exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?disallow=allsss,ssssss,sssss,sssss')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo disallow deve ser de no máximo 20 caracteres.'
    )
  })

  test('Should return 422 if an invalid disallow was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?disallow=lsss asdasd asd asd')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo disallow não corresponde com o padrão aceito.'
    )
  })

  test('Should return 422 if an invalid codec was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?disallow=alaw,tes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo disallow deve conter um codec válido.'
    )
  })
  // ###############################################################

  // ######################## ALLOW #############################
  test('Should return 422 if allow exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?allow=allsss,ssssss,sssss,sssss')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo allow deve ser de no máximo 20 caracteres.'
    )
  })

  test('Should return 422 if an invalid allow was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?allow=lsss asdasd asd asd')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo allow não corresponde com o padrão aceito.'
    )
  })

  test('Should return 422 if an invalid codec was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?allow=alaw,tes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(body[0].message, 'O campo allow deve conter um codec válido.')
  })
  // ###############################################################

  // ########################## AORS ###############################
  test('Should return 422 if aors exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?aors=aors2asda')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo aors deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 422 if aors is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?aors=ao')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo aors deve ser de no mínimo 3 caracteres.'
    )
  })
  // ###############################################################

  // ########################### AUTH ##############################
  test('Should return 422 if auth exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?auth=auth2test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo auth deve ser de no máximo 5 caracteres.'
    )
  })

  test('Should return 422 if auth is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?auth=au')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo auth deve ser de no mínimo 3 caracteres.'
    )
  })
  // ###############################################################

  // ##################### MAC ADDRESS #############################
  test('Should return 422 if address length does not match the specified pattern', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?macAddress=01:23:45:67:89:AEE')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo macAddress deve ser de no máximo 17 caracteres.'
    )
  })

  test('Should return 422 if an invalid macAddress was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?macAddress=01,23:45:67:89:ae')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo macAddress não corresponde com o padrão aceito.'
    )
  })
  // ###############################################################

  // ############################## DENY ###########################
  test('Should return 422 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?deny=154.145.142.9999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo deny é invalido'
    )
  })

  test('Should return 422 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?deny=154.145.142.999/266.254.215.25')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo deny é invalido'
    )
  })

  test('Should return 422 if deny exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?deny=255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo deny deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 422 if deny is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?deny=1.1.1.')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo deny deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ######################## CONTACT DENY #########################
  test('Should return 422 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?contact_deny=154.145.142.9999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo contact_deny é invalido'
    )
  })

  test('Should return 422 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?contact_deny=154.145.142.999/266.254.215.25')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo contact_deny é invalido'
    )
  })

  test('Should return 422 if contact_deny exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?contact_deny=255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo contact_deny deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 422 if contact_deny is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?contact_deny=1.1.1.')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo contact_deny deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ########################### PERMIT ############################
  test('Should return 422 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?permit=154.145.142.9999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo permit é invalido'
    )
  })

  test('Should return 422 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?permit=154.145.142.999/266.254.215.25')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo permit é invalido'
    )
  })

  test('Should return 422 if permit exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?permit=255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo permit deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 422 if permit is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?permit=1.1.1.')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo permit deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ####################### CONTACT PERMIT ########################
  test('Should return 422 if an invalid ip was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?contact_permit=154.145.142.9999')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo contact_permit é invalido'
    )
  })

  test('Should return 422 if an invalid mask was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?contact_permit=154.145.142.999/266.254.215.25')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'Um dos parâmetros informados no campo contact_permit é invalido'
    )
  })

  test('Should return 422 if contact_permit exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?contact_permit=255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255,255.64.2.199/145.8.218.54,255.64.2.199/255.255.255.255'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo contact_permit deve ser de no máximo 95 caracteres.'
    )
  })

  test('Should return 422 if contact_permit is below the minimum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?contact_permit=1.1.1.')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo contact_permit deve ser de no mínimo 7 caracteres.'
    )
  })
  // ###############################################################

  // ######################## CALL GROUP ###########################
  test('Should return 422 if invalid callgroup was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?call_group=as')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo call_group deve conter um grupo válido.'
    )
  })

  test('Should return 422 if call_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?call_group=54,54,54,54,54,54,54,54,54,54,54,54,54,54'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo call_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### PICKUP GROUP ##########################
  test('Should return 422 if invalid pickup_group was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?pickup_group=as')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo pickup_group deve conter um grupo válido.'
    )
  })

  test('Should return 422 if pickup_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?pickup_group=54,54,54,54,54,54,54,54,54,54,54,54,54,54'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo pickup_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ###################### NAMED CALL GROUP #######################
  test('Should return 422 if named_call_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?named_call_group=54,54,54,54,54,54,54,54,54,54,54,54,54,54'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo named_call_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ###################### NAMED PICKUP GROUP #######################
  test('Should return 422 if named_pickup_group exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?named_pickup_group=54,54,54,54,54,54,54,54,54,54,54,54,54,54'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo named_pickup_group deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### OUTBOUND AUTH ########################
  test('Should return 422 if outbound_auth exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?outbound_auth=54,54,54,54,54,54,54,54,54,54,54,54,54,54'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo outbound_auth deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ####################### OUTBOUND PROXY ########################
  test('Should return 422 if outbound_proxy exceeds the maximum length', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get(
        '/endpoints/list/?outbound_proxy=54,54,54,54,54,54,54,54,54,54,54,54,54,54'
      )
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      'O campo outbound_proxy deve ser de no máximo 40 caracteres.'
    )
  })
  // ###############################################################

  // ######################## DTMF MODE ########################
  test('Should return 422 if an invalid dtmf_mode was provided', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?dtmf_mode=maybe')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422)

    assert.equal(
      body[0].message,
      "O campo dtmf_mode deve ser 'rfc4733,inband,info,auto,auto_info'."
    )
  })
  // ###############################################################

  // ################### SUCCESSFULLY LISTED ITEM ####################
  test('Should return 200 if the item was listed', async (assert) => {
    const { body } = await supertest(process.env.BASE_URL)
      .get('/endpoints/list/?id=id_ex')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    assert.equal(body[0].id, 'id_ex')
    assert.equal(body[0].transport, 'udp')
    assert.equal(body[0].aors, 'aors_')
    assert.equal(body[0].auth, 'auth_')
  })
  // ###############################################################
})
