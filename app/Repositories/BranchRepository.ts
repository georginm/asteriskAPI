import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Aor from 'App/Models/Aor'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class BranchRepository {
  public static t_endpoint = 'ps_endpoints'
  public static t_aor = 'ps_aors'
  public static t_auth = 'ps_auths'

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
          'pe.rtp_timeout,' +
          'pe.rtp_timeout_hold,' +
          'pe.rtp_keepalive,' +
          'pe.permit,' +
          'pe.rtp_keepalive,' +
          "(select json_build_object('id', pa.id, 'contact', pa.contact, 'max_contacts', pa.max_contacts)  from ps_aors as pa where pa.id = pe.aors) as aors, " +
          "(select json_build_object('id', pa2.id, 'username', pa2.username, 'password', pa2.password) from ps_auths as pa2 where pa2.id = pe.auth) as auth " +
          'from ' +
          'ps_endpoints pe'
      )

      return data.rows
    } catch (error) {
      throw new InternalServerErrorException(error.message)
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
          'pe.rtp_timeout,' +
          'pe.rtp_timeout_hold,' +
          'pe.rtp_keepalive,' +
          'pe.permit,' +
          'pe.rtp_keepalive,' +
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
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async create(data): Promise<any> {
    const trx = await Database.transaction()

    try {
      await new Endpoint().merge(data.endpoint).useTransaction(trx).save()
      await new Aor().merge(data.aor).useTransaction(trx).save()
      await new Auth().merge(data.auth).useTransaction(trx).save()
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw new InternalServerErrorException(error.message)
    }

    return data
  }

  public static async update(id, data): Promise<any> {
    const trx = await Database.transaction()

    try {
      await (await Endpoint.findOrFail(id))
        .merge(data.endpoint)
        .useTransaction(trx)
        .save()

      await (await Aor.findOrFail(id))
        .merge(data.aor)
        .useTransaction(trx)
        .save()

      await (await Auth.findOrFail(id))
        .merge(data.auth)
        .useTransaction(trx)
        .save()

      // await await trx.from(Aor.table).where('id', id).update(data.aor)
      // await trx.from(Auth.table).where('id', id).update(data.auth)
      // await trx.from(Endpoint.table).where('id', id).update(data.endpoint)
      trx.commit()
    } catch (error) {
      trx.rollback()
      throw new InternalServerErrorException(error.message)
    }

    return data
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
      throw new InternalServerErrorException(error.message)
    }

    return true
  }
}
