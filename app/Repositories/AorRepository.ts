// import Database from '@ioc:Adonis/Lucid/Database'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Aor from 'App/Models/Aor'

export default class AorRepository extends Aor {
  public static async index(id: string): Promise<Aor[]> {
    try {
      return await Aor.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Aor[]> {
    try {
      return await Aor.query()
        .select('ps_aors.id', 'ps_aors.max_contacts')
        .if(filter, (query) => {
          query.where('id', `${filter}`)
        })
        .orderBy('id')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
