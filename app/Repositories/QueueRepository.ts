import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Queue from 'App/Models/Queue'

export default class QueueRepository extends Queue {
  public static async show(data) {
    try {
      return await Queue.query()
        .where('name', data)
        .orWhere('context', data)
        .orderBy('name')
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }

  public static async index(): Promise<Queue[]> {
    try {
      return await Queue.all()
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }
}
