import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class EndpointRepository extends Endpoint {
  public static async show(data) {
    try {
      return await Database.from(Endpoint.table)
        .join(Auth.table, 'ps_endpoints.auth', '=', 'ps_auths.id')
        .select('ps_endpoints.id', 'ps_endpoints.context')
        .select('ps_auths.username')
        .where('ps_endpoints.id', data)
        .orWhere('context', data)
        .orderBy('id')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index() {
    try {
      return await Database.from(Endpoint.table)
        .join(Auth.table, 'ps_endpoints.auth', '=', 'ps_auths.id')
        .select('ps_endpoints.id', 'ps_endpoints.context')
        .select('ps_auths.username')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
