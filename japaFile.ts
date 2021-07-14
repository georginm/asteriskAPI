import 'reflect-metadata'
import { join } from 'path'
import getPort from 'get-port'
import { configure } from 'japa'
import sourceMapSupport from 'source-map-support'
import supertest from 'supertest'

process.env.NODE_ENV = 'testing'
process.env.ADONIS_ACE_CWD = join(__dirname)
sourceMapSupport.install({ handleUncaughtExceptions: false })

async function startHttpServer() {
  const { Ignitor } = await import('@adonisjs/core/build/src/Ignitor')
  process.env.PORT = String(await getPort())
  await new Ignitor(__dirname).httpServer().start()
}

const before = async () => {
  await supertest(process.env.BASE_URL).post('/aors').send({ id: 'aors_' })
  await supertest(process.env.BASE_URL).post('/auths').send({
    id: 'auth_',
    auth_type: 'userpass',
    username: 'any_username',
    password: 'any_password',
  })

  await supertest(process.env.BASE_URL).post('/endpoints').send({
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
  await supertest(process.env.BASE_URL).delete('/aors/aors_')
  await supertest(process.env.BASE_URL).delete('/auths/auths_')
  await supertest(process.env.BASE_URL).delete('/endpoints/id_ex')
}

/**
 * Configure test runner
 */
configure({
  files: ['tests/**/*.spec.ts'],
  before: [startHttpServer, before],
  after: [
    async () => {
      console.log('Tests finished.')
    },
    after,
  ],
})
