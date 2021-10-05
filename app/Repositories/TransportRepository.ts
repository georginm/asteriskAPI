import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Transport from 'App/Models/Transport'

export default class TransportRepository extends Transport {
  public static async index(page: number, limit: number): Promise<Transport[]> {
    try {
      return await Transport.query()
        .select('id', 'bind', 'protocol')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(
    data: string,
    page: number,
    limit: number
  ): Promise<Transport[]> {
    try {
      return await Transport.query()
        .select('id', 'bind', 'protocol')
        .where('id', data)
        .orWhere('bind', 'like', `%${data}%`)
        .orWhere('local_net', data)
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
