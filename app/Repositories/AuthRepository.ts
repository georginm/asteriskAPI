import { Exception } from '@adonisjs/core/build/standalone'
import Auth from 'App/Models/Auth'

export default class AuthRepository extends Auth {
  public static async show(data) {
    try {
      return await Auth.query()
        .where('id', data)
        .orWhere('username', data)
        .orderBy('id')
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}
