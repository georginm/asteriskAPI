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
})
