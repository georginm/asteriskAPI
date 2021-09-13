import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Iax from 'App/Models/Iax'

export default class IaxRepository extends Iax {
  public static async show(data): Promise<Iax[]> {
    try {
      return await Iax.query()
        .where('name', data)
        .orWhere('username', data)
        .orWhere('context', data)
        .orWhere('host', data)
        .orWhere('ipaddr', data)
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }

  public static async index(): Promise<Iax[]> {
    try {
      return await Iax.all()
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }
}
