import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import EndpointRepository from 'App/Repositories/EndpointRepository'
import { destroy, exists, unique } from 'App/utils/database/'

export default class EndpointService {
  public async create(data: any): Promise<EndpointRepository> {
    await unique(EndpointRepository.table, 'id', data.id, 'id')
    await unique(EndpointRepository.table, 'auth', data.auth, 'id')
    await unique(EndpointRepository.table, 'aors', data.aors, 'id')
    await unique(EndpointRepository.table, 'mac_address', data.macAddress, 'id')

    await exists('ps_auths', 'id', data.auth, 'id')
    await exists('ps_aors', 'id', data.aors, 'id')

    try {
      return await EndpointRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data: any, id: string): Promise<EndpointRepository> {
    await exists(EndpointRepository.table, 'id', id)

    if (data.auth) await unique(EndpointRepository.table, 'auth', data.auth)
    if (data.aors) await unique(EndpointRepository.table, 'aors', data.aors)
    if (data.macAddress)
      await unique(EndpointRepository.table, 'mac_address', data.macAddress)

    if (data.auth) await exists('ps_auths', 'id', data.auth)
    if (data.aors) await exists('ps_aors', 'id', data.aors)

    try {
      const item = await EndpointRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id: string): Promise<boolean> {
    return await destroy(EndpointRepository.table, 'id', id)
  }

  public async show(id: string): Promise<EndpointRepository[]> {
    const item = await EndpointRepository.show(id)
    if (!item.length) throw new BadRequestException('Endpoint Not Exists')
    return item
  }

  public async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<EndpointRepository[]> {
    const data = await EndpointRepository.index(page, limit, filter)
    if (!data.length) throw new BadRequestException('Endpoint Not Exists')
    return data
  }
}
