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
