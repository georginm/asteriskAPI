import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import User from 'App/Models/User'

export default class UserRepository extends User {
  public static async index(page: number, limit: number): Promise<User[]> {
    try {
      return await User.query()
        .select('id', 'fullname', 'email')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(
    data: string,
    page: number,
    limit: number
  ): Promise<User[]> {
    try {
      return await User.query()
        .select('id', 'fullname', 'email')
        .where('id', data)
        .orWhere('fullname', 'like', `%${data}%`)
        .orWhere('cpf', 'like', `%${data}%`)
        .orWhere('email', 'like', `%${data}%`)
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
