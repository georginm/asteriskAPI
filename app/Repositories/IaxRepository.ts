import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Iax from 'App/Models/Iax'

export default class IaxRepository extends Iax {
  public static async show(data): Promise<Iax[]> {
    try {
      return await Iax.query()
        .select('id', 'name', 'context', 'username', 'host', 'port')
        .where('name', data)
        .orWhere('username', data)
        .orWhere('context', data)
        .orWhere('host', data)
        .orWhere('port', data)
        .orWhere('type', data)
        .orWhere('callerid', data)
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(): Promise<Iax[]> {
    try {
      return await Iax.query()
        .select('id', 'name', 'context', 'username', 'host', 'port')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
