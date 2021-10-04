import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Auth from 'App/Models/Auth'

export default class AuthRepository extends Auth {
  public static async show(data) {
    try {
      return await Auth.query()
        .select('id', 'username', 'password')
        .where('id', data)
        .orWhere('username', data)
        .orderBy('id')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index() {
    try {
      return await Auth.query()
        .select('id', 'username', 'password')
        .orderBy('id')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
