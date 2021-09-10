import Database from '@ioc:Adonis/Lucid/Database'
import Aor from 'App/Models/Aor'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class BranchRepository {
  public static async index(): Promise<any> {
    const data = await Database.from('ps_endpoints')
      .join('ps_aors', 'ps_endpoints.aors', '=', 'ps_aors.id')
      .join('ps_auths', 'ps_endpoints.auth', '=', 'ps_auths.id')
      .select('ps_endpoints.*')
      .select('ps_auths.*')
      .select('ps_aors.*')

    return data
  }

  public static async show(where): Promise<any> {
    const data = await Database.from('ps_endpoints')
      .join('ps_aors', 'ps_endpoints.aors', '=', 'ps_aors.id')
      .join('ps_auths', 'ps_endpoints.auth', '=', 'ps_auths.id')
      .select('ps_endpoints.*')
      .select('ps_auths.*')
      .select('ps_aors.*')
      .where('ps_endpoints.id', where)
      .orWhere('ps_endpoints.context', where)
      .orWhere('ps_endpoints.transport', where)
      .orWhere('ps_endpoints.auth', where)
      .orWhere('ps_endpoints.aors', where)
      .orWhere('ps_endpoints.mac_address', where)
      .orWhere('ps_auths.username', where)

    return data
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
      return error
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
      return error
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
      return error
    }

    return true
  }
}
