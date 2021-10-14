import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Registration from 'App/Models/Registration'

export default class RegistrationRepository extends Registration {
  public static async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Registration[]> {
    try {
      return await Registration.query()
        .select('id', 'client_uri', 'server_uri', 'transport')
        .if(filter, (query) => {
          query
            .where('id', 'ilike', `%${filter}%`)
            .orWhere('client_uri', 'ilike', `%${filter}%`)
            .orWhere('contact_user', 'ilike', `%${filter}%`)
            .orWhere('server_uri', 'ilike', `%${filter}%`)
            .orWhere('transport', 'ilike', `%${filter}%`)
        })
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(id: string): Promise<Registration[]> {
    try {
      return await Registration.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
