import { Exception } from '@adonisjs/core/build/standalone'
import AorRepository from 'App/Repositories/AorRepository'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

export default class AorServices {
  public async create(data): Promise<AorRepository> {
    await unique('ps_aors', 'id', data.id, 'id')

    try {
      return await AorRepository.create(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async update(data, id): Promise<AorRepository> {
    await exists('ps_aors', 'id', id, 'id')
    try {
      const item = await AorRepository.find(id)

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
    await exists('ps_aors', 'id', data.id, 'id')

    const item = await AorRepository.find(data.id)

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
      await exists('ps_aors', key, data[key], key)
    }

    try {
      return await AorRepository.query().where(data).orderBy('id')
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async index() {
    return await AorRepository.all()
  }
}
