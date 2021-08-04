import { Exception } from '@adonisjs/core/build/standalone'
import Aor from 'App/Models/Aor'
import { exists } from 'App/utils/exists'
import { unique } from 'App/utils/unique'

export default class AorServices {
  public async create(data): Promise<Aor> {
    await unique('ps_aors', 'id', data.id, 'id')

    try {
      return await Aor.create(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async update(data): Promise<Aor> {
    await exists('ps_aors', 'id', data.id, 'id')

    try {
      const item = await Aor.find(data.id)

      if (!item) {
        throw new Exception('Internal Server Error', 500)
      }

      item.merge(data)
      await item.save()

      return data
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async destroy(data) {
    await exists('ps_aors', 'id', data.id, 'Aor', 'id')

    const item = await Aor.find(data.id)

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
    return await Aor.query().where(data).orderBy('id')
  }

  public async index() {
    return await Aor.all()
  }
}
