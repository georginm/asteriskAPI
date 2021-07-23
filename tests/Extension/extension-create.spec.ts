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
})
