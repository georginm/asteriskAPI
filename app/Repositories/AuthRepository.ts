import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Auth from 'App/Models/Auth'

export default class AuthRepository extends Auth {
  public static async index(id: string): Promise<Auth[]> {
    try {
      return await Auth.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Auth[]> {
    try {
      return await Auth.query()
        .select('id', 'username', 'password')
        .if(filter, (query) => {
          query
            .where('id', `${filter}`)
            .orWhere('username', 'ilike', `%${filter}%`)
        })
        .orderBy('id')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
