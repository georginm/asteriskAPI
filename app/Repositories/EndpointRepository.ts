import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class EndpointRepository extends Endpoint {
  public static async show(id: string): Promise<any> {
    try {
      return await Endpoint.query().where('id', id)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<any> {
    try {
      return await Database.from(Endpoint.table)
        .join(Auth.table, 'ps_endpoints.auth', '=', 'ps_auths.id')
        .select('ps_endpoints.id', 'ps_endpoints.context')
        .select('ps_auths.username')
        .if(filter, (query) => {
          query
            .where('ps_endpoints.id', 'ilike', `%${filter}%`)
            .orWhere('ps_endpoints.context', 'ilike', `%${filter}%`)
            .orWhere('ps_auths.username', 'ilike', `%${filter}%`)
        })
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
