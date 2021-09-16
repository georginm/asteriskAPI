import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Transport from 'App/Models/Transport'

export default class TransportRepository extends Transport {
  public static async index(): Promise<Transport[]> {
    try {
      return await Transport.all()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
