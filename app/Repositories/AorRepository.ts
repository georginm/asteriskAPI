// import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Aor from 'App/Models/Aor'

export default class AorRepository extends Aor {
  public static async show(id: string): Promise<Aor[]> {
    try {
      return await Aor.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Aor[]> {
    try {
      return await Aor.query()
        .select('id', 'max_contacts')
        .if(filter, (query) => {
          query.where('id', 'ilike', `%${filter}%`)
          query.orWhere('contact', 'ilike', `%${filter}%`)
          query.orWhere('outbound_proxy', 'ilike', `%${filter}%`)
        })
        .orderBy('id')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
