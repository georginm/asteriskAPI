import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import User from 'App/Models/User'

export default class UserRepository extends User {
  public static async show(id: string): Promise<User[]> {
    try {
      return await User.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(
    page: number,
    limit: number,
    filter: string
  ): Promise<User[]> {
    console.log(filter)
    try {
      return await User.query()
        .select('id', 'fullname', 'email')
        .if(filter, (query) => {
          query
            .where('id', filter)
            .orWhere('fullname', 'ilike', `%${filter}%`)
            .orWhere('cpf', 'ilike', `%${filter}%`)
            .orWhere('email', 'ilike', `%${filter}%`)
        })
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
