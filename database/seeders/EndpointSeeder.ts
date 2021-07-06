import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Endpoint from 'App/Models/Endpoint'

export default class EndpointsSeederSeeder extends BaseSeeder {
  public async run() {
    await Endpoint.create({
      id: '100',
      transport: 'transport-udp',
      aors: '100',
      auth: '100',
      context: 'from-internal',
      disallow: 'all',
      allow: 'alaw, ulaw, gsm',
      directMedia: 'no',
      forceRPort: 'yes',
      rewriteContact: 'yes',
      rtpSymmetric: 'yes',
      macAddress: '',
    })
  }
}
