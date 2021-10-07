import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Queue from 'App/Models/Queue'

export default class QueueRepository extends Queue {
  public static async index(name: string): Promise<Queue[]> {
    try {
      return await Queue.query().where('name', name).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Queue[]> {
    try {
      return await await Queue.query()
        .select('name', 'context', 'strategy')
        .if(filter, (query) => {
          query
            .where('name', 'ilike', `%${filter}%`)
            .orWhere('context', 'ilike', `%${filter}%`)
            .orWhere('musiconhold', 'ilike', `%${filter}%`)
        })
        .orderBy('name')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
