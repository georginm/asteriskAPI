import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Extension from 'App/Models/Extension'

export default class ExtensionsSeederSeeder extends BaseSeeder {
  public async run() {
    await Extension.createMany([
      {
        context: 'from-internal',
        exten: '*100',
        priority: 4,
        app: 'hangup',
        appData: '',
      },
      {
        context: 'from-internal',
        exten: '*100',
        priority: 3,
        app: 'playback',
        appData: 'hello-world',
      },
      {
        context: 'from-internal',
        exten: '*100',
        priority: 2,
        app: 'wait',
        appData: '1',
      },
      {
        context: 'from-internal',
        exten: '*100',
        priority: 1,
        app: 'answer',
        appData: '',
      },
    ])
  }
}
