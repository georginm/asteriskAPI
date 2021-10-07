import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Transport from 'App/Models/Transport'

export default class TransportRepository extends Transport {
  public static async show(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Transport[]> {
    try {
      return await Transport.query()
        .select('id', 'bind', 'protocol')
        .if(filter, (query) => {
          query
            .where('id', 'ilike', `%${filter}%`)
            .orWhere('bind', 'ilike', `%${filter}%`)
            .orWhere('local_net', 'ilike', `%${filter}%`)
        })
        .orderBy('id')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(id: string): Promise<Transport[]> {
    try {
      return await Transport.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
