import { Exception } from '@adonisjs/core/build/standalone'
import Aor from 'App/Models/Aor'

export default class AorRepository extends Aor {
  public static async show(data) {
    try {
      return await Aor.query()
        .where('id', data)
        .orWhere('contact', data)
        .orWhere('max_contacts', data)
        .orWhere('outbound_proxy', data)
        .orderBy('id')
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}
