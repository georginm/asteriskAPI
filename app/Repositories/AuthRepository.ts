import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import Auth from 'App/Models/Auth'

export default class AuthRepository extends Auth {
  public static async show(data) {
    try {
      return await Auth.query()
        .where('id', data)
        .orWhere('username', data)
        .orderBy('id')
    } catch (error) {
      throw new InternalServerErrorException(error.message, 500)
    }
  }
}
