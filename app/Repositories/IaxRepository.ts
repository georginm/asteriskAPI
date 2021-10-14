import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Iax from 'App/Models/Iax'

export default class IaxRepository extends Iax {
  public static async show(id: number): Promise<Iax[]> {
    try {
      return await Iax.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Iax[]> {
    try {
      return await Iax.query()
        .select('id', 'name', 'context', 'username', 'host', 'port')
        .if(filter, (query) => {
          query
            .where('name', 'ilike', `%${filter}%`)
            .orWhere('username', 'ilike', `%${filter}%`)
            .orWhere('context', 'ilike', `%${filter}%`)
            .orWhere('host', 'ilike', `%${filter}%`)
            .orWhere('callerid', 'ilike', `%${filter}%`)
        })
        .orderBy('id', 'desc')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
