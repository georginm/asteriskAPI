import { Exception } from '@adonisjs/core/build/standalone'
import Auth from 'App/Models/Auth'
import { unique } from 'App/utils/unique'

export default class AuthServices {
  public async create(data): Promise<Auth> {
    await unique('ps_auths', 'id', data.id, 'id')
    await unique('ps_auths', 'username', data.username, 'username')

    try {
      return await Auth.create(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }
}
