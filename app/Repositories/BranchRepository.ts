import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Aor from 'App/Models/Aor'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class BranchRepository {
  public static async index(): Promise<any> {
    try {
      const data = await Database.rawQuery(
        'select ' +
          'pe.id, ' +
          'pe.context, ' +
          'pe.transport, ' +
          'pe.disallow,' +
          'pe.allow, ' +
          'pe.rewrite_contact, ' +
          'pe.rtp_symmetric, ' +
          'pe.force_rport, ' +
          'pe.mac_address, ' +
          'pe.dtmf_mode,' +
          'pe.call_group,' +
          'pe.pickup_group,' +
          'pe.named_call_group,' +
          'pe.named_pickup_group,' +
          'pe.callerid,' +
          "(select json_build_object('id', pa.id, 'contact', pa.contact, 'max_contacts', pa.max_contacts)  from ps_aors as pa where pa.id = pe.aors) as aors, " +
          "(select json_build_object('id', pa2.id, 'username', pa2.username, 'password', pa2.password) from ps_auths as pa2 where pa2.id = pe.auth) as auth " +
          'from ' +
          'ps_endpoints pe'
      )

      return data.rows
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }

  public static async show(where): Promise<any> {
    try {
      const data = await Database.rawQuery(
        'SELECT ' +
          'pe.id, ' +
          'pe.context, ' +
          'pe.transport, ' +
          'pe.disallow,' +
          'pe.allow, ' +
          'pe.rewrite_contact, ' +
          'pe.rtp_symmetric, ' +
          'pe.force_rport, ' +
          'pe.mac_address, ' +
          'pe.dtmf_mode,' +
          'pe.call_group,' +
          'pe.pickup_group,' +
          'pe.named_call_group,' +
          'pe.named_pickup_group,' +
          'pe.callerid,' +
          "(SELECT json_build_object('id', pa.id, 'contact', pa.contact, 'max_contacts', pa.max_contacts)  FROM ps_aors AS pa WHERE pa.id = pe.aors) AS aors, " +
          "(SELECT json_build_object('id', pa2.id, 'username', pa2.username, 'password', pa2.password) FROM ps_auths AS pa2 WHERE pa2.id = pe.auth) AS auth " +
          'FROM ' +
          'ps_endpoints pe ' +
          `WHERE (pe.id = '${where}') ` +
          `OR (pe.context = '${where}') ` +
          `OR (pe.transport = '${where}') ` +
          `OR (pe.auth = '${where}') ` +
          `OR (pe.aors = '${where}') ` +
          `OR (pe.mac_address = '${where}') `
      )

      return data.rows
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }

  public static async create(data): Promise<any> {
    const trx = await Database.transaction()

    try {
      await trx.insertQuery().table('ps_aors').insert(data.aor)
      await trx.insertQuery().table('ps_auths').insert(data.auth)
      await trx.insertQuery().table('ps_endpoints').insert(data.endpoint)
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw new InternalServerErrorException(error.message, 500)
    }

    return true
  }

  public static async update(id, data): Promise<any> {
    const trx = await Database.transaction()

    try {
      await trx.from(Aor.table).where('id', id).update(data.aor)
      await trx.from(Auth.table).where('id', id).update(data.auth)
      await trx.from(Endpoint.table).where('id', id).update(data.endpoint)
      trx.commit()
    } catch (error) {
      trx.rollback()
      throw new InternalServerErrorException(error.message, 500)
    }

    return true
  }

  public static async delete(id): Promise<any> {
    const trx = await Database.transaction()

    try {
      await trx.from(Aor.table).where('id', id).del()
      await trx.from(Auth.table).where('id', id).del()
      await trx.from(Endpoint.table).where('id', id).del()
      trx.commit()
    } catch (error) {
      trx.rollback()
      throw new InternalServerErrorException(error.message, 500)
    }

    return true
  }
}
