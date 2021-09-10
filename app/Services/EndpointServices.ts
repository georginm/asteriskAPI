import BadRequestException from 'App/Exceptions/BadRequestException'
import EndpointRepository from 'App/Repositories/EndpointRepository'
import { destroy } from 'App/utils/database/destroy'
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

    return await EndpointRepository.create(data)
  }

  public async update(data, id): Promise<EndpointRepository | null> {
    await exists('ps_endpoints', 'id', id)

    if (data.auth) await unique('ps_endpoints', 'auth', data.auth)
    if (data.aors) await unique('ps_endpoints', 'aors', data.aors)
    if (data.macAddress)
      await unique('ps_endpoints', 'mac_address', data.macAddress)

    if (data.auth) await exists('ps_auths', 'id', data.auth)
    if (data.aors) await exists('ps_aors', 'id', data.aors)

    const item = await EndpointRepository.findOrFail(id)

    return await item.merge(data).save()
  }

  public async destroy(id: string): Promise<boolean> {
    return await destroy('ps_endpoints', 'id', id)
  }

  public async show(data): Promise<Array<EndpointRepository>> {
    const item = await EndpointRepository.show(data)
    if (!item.length) throw new BadRequestException('Endpoint Not Exists', 400)
    return item
  }

  public async index() {
    const data = await EndpointRepository.all()
    if (!data.length) throw new BadRequestException('Endpoint Not Exists', 400)
    return data
  }
}
