import { Exception } from '@adonisjs/core/build/standalone'
import Endpoint from 'App/Models/Endpoint'

export default class EndpointRepository extends Endpoint {
  public static async show(data) {
    try {
      return await Endpoint.query()
        .where('id', data)
        .orWhere('transport', data)
        .orWhere('aors', data)
        .orWhere('auth', data)
        .orWhere('context', data)
        .orderBy('id')
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}
