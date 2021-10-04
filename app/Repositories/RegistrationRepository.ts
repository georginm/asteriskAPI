import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Registration from 'App/Models/Registration'

export default class RegistrationRepository extends Registration {
  public static async index(): Promise<Registration[]> {
    try {
      return await Registration.query()
        .select('id', 'cliente_uri', 'server_uri', 'transport')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(data): Promise<Registration[]> {
    try {
      return await Registration.query()
        .select('id', 'cliente_uri', 'server_uri', 'transport')
        .where('id', data)
        .orWhere('client_uri', data)
        .orWhere('contact_user', data)
        .orWhere('server_uri', data)
        .orWhere('transport', data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
