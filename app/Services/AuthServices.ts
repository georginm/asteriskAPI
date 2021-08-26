import { Exception } from '@adonisjs/core/build/standalone'
import AuthRepository from 'App/Repositories/AuthRepository'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

export default class AuthServices {
  public async create(data): Promise<AuthRepository> {
    await unique('ps_auths', 'id', data.id, 'id')
    await unique('ps_auths', 'username', data.username, 'username')

    try {
      return await AuthRepository.create(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async update(data, id: string): Promise<AuthRepository> {
    await exists('ps_auths', 'id', id, 'id')
    await unique('ps_auths', 'username', data.username, 'username')

    try {
      const item = await AuthRepository.find(id)

      if (!item) {
        throw new Exception('Internal Server Error', 500)
      }

      item.merge(data)
      await item.save()

      return item
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async destroy(data) {
    await exists('ps_auths', 'id', data.id, 'id')

    const item = await AuthRepository.find(data.id)

    if (!item) {
      throw new Exception('Internal Server Error', 500)
    }

    try {
      return await item.delete()
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async list(data) {
    const keys = Object.keys(data)

    for (var key of keys) {
      await exists('ps_auths', key, data[key], key)
    }

    try {
      return await AuthRepository.query().where(data).orderBy('id')
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async index() {
    return await AuthRepository.all()
  }
}
