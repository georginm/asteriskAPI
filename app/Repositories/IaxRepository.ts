import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Iax from 'App/Models/Iax'

export default class IaxRepository extends Iax {
  public static async show(
    data: string,
    page: number,
    limit: number
  ): Promise<Iax[]> {
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
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(page: number, limit: number): Promise<Iax[]> {
    try {
      return await Iax.query()
        .select('id', 'name', 'context', 'username', 'host', 'port')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
