import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Aor from 'App/Models/Aor'

export default class AorsSeederSeeder extends BaseSeeder {
  public async run() {
    await Aor.create({
      id: '100',
      contact: '',
      maxContacts: 1,
    })
  }
}
