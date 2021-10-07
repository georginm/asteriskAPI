import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import User from 'App/Models/User'

export default class UserRepository extends User {
  public static async show(page: number, limit: number): Promise<User[]> {
    try {
      return await User.query()
        .select('id', 'fullname', 'email')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(
    filter: string,
    page: number,
    limit: number
  ): Promise<User[]> {
    console.log(filter)
    try {
      return await User.query()
        .select('id', 'fullname', 'email')
        .where('id', filter)
        .orWhere('fullname', 'ilike', `%${filter}%`)
        .orWhere('cpf', 'ilike', `%${filter}%`)
        .orWhere('email', 'ilike', `%${filter}%`)
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
