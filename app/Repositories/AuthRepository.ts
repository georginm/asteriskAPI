import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Auth from 'App/Models/Auth'

export default class AuthRepository extends Auth {
  public static async show(
    data: string,
    page: number,
    limit: number
  ): Promise<Auth[]> {
    try {
      return await Auth.query()
        .select('id', 'username', 'password')
        .where('id', data)
        .orWhere('username', data)
        .orderBy('id')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(page, limit): Promise<Auth[]> {
    try {
      return await Auth.query()
        .select('id', 'username', 'password')
        .orderBy('id')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
