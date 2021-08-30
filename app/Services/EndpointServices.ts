import { Exception } from '@adonisjs/core/build/standalone'
import EndpointRepository from 'App/Repositories/EndpointRepository'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

export default class EndpointService {
  public async create(data): Promise<EndpointRepository> {
    await unique('ps_endpoints', 'id', data.id, 'id')
    await unique('ps_endpoints', 'auth', data.auth, 'id')
    await unique('ps_endpoints', 'aors', data.aors, 'id')
    await unique('ps_endpoints', 'mac_address', data.macAddress, 'id')

    await exists('ps_auths', 'id', data.auth, 'id')
    await exists('ps_aors', 'id', data.aors, 'id')

    try {
      return await EndpointRepository.create(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async update(data, id): Promise<EndpointRepository | null> {
    await exists('ps_endpoints', 'id', id)

    if (data.auth) await unique('ps_endpoints', 'auth', data.auth)
    if (data.aors) await unique('ps_endpoints', 'aors', data.aors)
    if (data.macAddress)
      await unique('ps_endpoints', 'mac_address', data.macAddress)

    if (data.auth) await exists('ps_auths', 'id', data.auth)
    if (data.aors) await exists('ps_aors', 'id', data.aors)

    try {
      const item = await EndpointRepository.find(id)

      if (!item) {
        return item
      }

      item.merge(data)

      return await item.save()
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async destroy(data) {
    await exists('ps_endpoints', 'id', data.id, 'id')

    const item = await EndpointRepository.find(data.id)

    if (!item) {
      throw new Exception('Internal Server Error', 500)
    }

    try {
      return await item.delete()
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async show(data): Promise<Array<EndpointRepository>> {
    try {
      return await EndpointRepository.show(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async index() {
    return await EndpointRepository.all()
  }
}
