import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
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
      throw new InternalServerErrorException(error.message, 500)
    }
  }

  public static async index() {
    try {
      return await Endpoint.all()
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }
}
