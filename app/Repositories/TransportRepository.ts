import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Transport from 'App/Models/Transport'

export default class TransportRepository extends Transport {
  public static async index(): Promise<Transport[]> {
    try {
      return await Transport.query()
        .select('id', 'bind', 'protocol')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(data): Promise<Transport[]> {
    try {
      return await Transport.query()
        .select('id', 'bind', 'protocol')
        .where('id', data)
        .orWhere('bind', 'like', `%${data}%`)
        .orWhere('local_net', data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
