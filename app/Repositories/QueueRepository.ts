import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Queue from 'App/Models/Queue'

export default class QueueRepository extends Queue {
  public static async show(data): Promise<Queue[]> {
    try {
      return await Queue.query()
        .select('name', 'context', 'strategy')
        .where('name', data)
        .orWhere('context', data)
        .orderBy('name')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(): Promise<Queue[]> {
    try {
      return await await Queue.query()
        .select('name', 'context', 'strategy')
        .orderBy('name')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
