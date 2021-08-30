import { Exception } from '@adonisjs/core/build/standalone'
import Queue from 'App/Models/Queue'

export default class QueueRepository extends Queue {
  public static async show(data) {
    try {
      return await Queue.query()
        .where('name', data)
        .orWhere('context', data)
        .orderBy('name')
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}
