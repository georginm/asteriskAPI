import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Aor from 'App/Models/Aor'

export default class AorRepository extends Aor {
  public static async show(data) {
    try {
      return await Database.from(this.table)
        .join('ps_contacts', 'ps_aors.id', '=', 'ps_contacts.endpoint')
        .select(
          'ps_aors.id',
          'ps_aors.max_contacts',
          'ps_contacts.via_addr',
          'ps_contacts.via_port'
        )
        .where('ps_aors.id', data)
        .orderBy('id')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index() {
    try {
      return await Database.from(this.table)
        .join('ps_contacts', 'ps_aors.id', '=', 'ps_contacts.endpoint')
        .select(
          'ps_aors.id',
          'ps_aors.max_contacts',
          'ps_contacts.via_addr',
          'ps_contacts.via_port'
        )
        .orderBy('id')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
