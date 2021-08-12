import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Auth from 'App/Models/Auth'

export default class AuthsSeederSeeder extends BaseSeeder {
  public async run() {
    await Auth.create({
      id: '100',
      authType: 'userpass',
      password: '100',
      username: '100',
    })
  }
}
