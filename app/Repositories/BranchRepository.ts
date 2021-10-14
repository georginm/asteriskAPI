import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Aor from 'App/Models/Aor'
import Auth from 'App/Models/Auth'
import Endpoint from 'App/Models/Endpoint'

export default class BranchRepository {
  public static t_endpoint = 'ps_endpoints'
  public static t_aor = 'ps_aors'
  public static t_auth = 'ps_auths'

  /**
   *
   * @param page
   * @returns
   */
  public static async index(page: number, limit: number, filter): Promise<any> {
    try {
      return await Database.from(Endpoint.table)
        .join(Auth.table, 'ps_endpoints.auth', '=', 'ps_auths.id')
        .select('ps_endpoints.id', 'ps_endpoints.context')
        .select('ps_auths.username')
        .if(filter, (query) => {
          query
            .where('ps_endpoints.id', `${filter}`)
            .orWhere('ps_endpoints.context', 'ilike', `%${filter}%`)
            .orWhere('ps_auths.username', 'ilike', `%${filter}%`)
        })
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  /**
   *
   * @param
   * @returns
   */
  public static async show(id: string): Promise<any> {
    try {
      return await Database.query().select(
        Database.raw(`
          json_build_object(
            'endpoint',
            (
              SELECT
                row_to_json("ps_endpoints")
              FROM
                "ps_endpoints"
              WHERE
                ps_endpoints.id = '${id}'
            ),

            'aor',
            (
              SELECT
                row_to_json("ps_aors")
              FROM
                "ps_aors"
              WHERE
                ps_aors.id = (
                  SELECT
                    ps_endpoints.aors
                  FROM
                    ps_endpoints
                  WHERE
                    ps_endpoints.id = '${id}'
                )
            ),

            'auth',
            (
              SELECT
                row_to_json("ps_auths")
              FROM
                "ps_auths"
              WHERE
                ps_auths.id = (
                  SELECT
                    ps_endpoints.auth
                  FROM
                    ps_endpoints
                  WHERE
                    ps_endpoints.id = '${id}'
                )
            )
          ) as Branch
        `)
      )
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
