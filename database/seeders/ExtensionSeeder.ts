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
        appdata: '',
      },
      {
        context: 'from-internal',
        exten: '*100',
        priority: 3,
        app: 'playback',
        appdata: 'hello-world',
      },
      {
        context: 'from-internal',
        exten: '*100',
        priority: 2,
        app: 'wait',
        appdata: '1',
      },
      {
        context: 'from-internal',
        exten: '*100',
        priority: 1,
        app: 'answer',
        appdata: '',
      },
    ])
  }
}
