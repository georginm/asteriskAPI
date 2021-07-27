import { Exception } from '@adonisjs/core/build/standalone'
import Endpoint from 'App/Models/Endpoint'
import { exists } from 'App/utils/exists'
import { unique } from 'App/utils/unique'

export default class EndpointService {
  public async create(data): Promise<Endpoint> {
    await unique('ps_endpoints', 'id', data.id, 'id')
    await unique('ps_endpoints', 'auth', data.auth, 'id')
    await unique('ps_endpoints', 'aors', data.aors, 'id')
    await unique('ps_endpoints', 'mac_address', data.macAddress, 'id')

    await exists('ps_auths', 'id', data.auth, 'auth')
    await exists('ps_aors', 'id', data.aors, 'aors')

    try {
      return await Endpoint.create(data)
    } catch (error) {
      throw new Exception(error, 500)
    }
  }

  public async update(data): Promise<Endpoint> {
    await exists('ps_endpoints', 'id', data.id, 'endpoint')

    if (data.auth) await unique('ps_endpoints', 'auth', data.auth)
    if (data.aors) await unique('ps_endpoints', 'aors', data.aors)
    if (data.macAddress)
      await unique('ps_endpoints', 'mac_address', data.macAddress)
    if (data.auth) await exists('ps_auths', 'id', data.auth, 'auth')
    if (data.aors) await exists('ps_aors', 'id', data.aors, 'aors')

    try {
      const item = await Endpoint.find(data.id)

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
    await exists('ps_endpoints', 'id', data.id, 'endpoint', 'id')

    const item = await Endpoint.find(data.id)

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
    return await Endpoint.query().where(data).orderBy('id')
  }

  public async index() {
    return await Endpoint.all()
  }
}
