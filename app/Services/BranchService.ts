import BadRequestException from 'App/Exceptions/BadRequestException'
import BranchRepository from 'App/Repositories/BranchRepository'
import { exists, unique } from 'App/utils/database/'

export default class BranchService {
  public async index(): Promise<BranchRepository[]> {
    const data = await BranchRepository.index()
    if (!data.length) throw new BadRequestException('Branch not Exists.', 400)
    return data
  }

  public async create(data): Promise<BranchRepository> {
    if (data.endpoint.auth !== data.auth.id)
      throw new BadRequestException(
        ' The endpoint.auth and auths.id must be the same.'
      )

    if (data.endpoint.aors !== data.aor.id)
      throw new BadRequestException(
        ' The endpoint.aors and aors.id must be the same.'
      )

    await unique('ps_endpoints', 'id', data.endpoint.id, 'id')
    await unique('ps_endpoints', 'auth', data.endpoint.auth, 'id')
    await unique('ps_endpoints', 'aors', data.endpoint.aors, 'id')
    await unique('ps_endpoints', 'mac_address', data.endpoint.macAddress, 'id')

    await unique('ps_auths', 'id', data.auth.id, 'id')
    await unique('ps_auths', 'username', data.auth.username, 'username')

    await unique('ps_aors', 'id', data.aor.id, 'id')

    return await BranchRepository.create(data)
  }

  public async update(data, id): Promise<BranchRepository> {
      throw new BadRequestException(
        ' The endpoint.auth and auths.id must be the same.'
      )

    if (data.endpoint.aors !== data.aor.id)
      throw new BadRequestException(
        ' The endpoint.aors and aors.id must be the same.'
      )

    await exists('ps_endpoints', 'id', id)

    await unique('ps_endpoints', 'auth', data.endpoint.auth, 'id')
    await unique('ps_endpoints', 'aors', data.endpoint.aors, 'id')
    await unique('ps_endpoints', 'mac_address', data.endpoint.macAddress, 'id')
    await unique('ps_auths', 'username', data.auth.username, 'username')

    await unique('ps_aors', 'id', data.aor.id, 'id')
    await unique('ps_auths', 'id', data.auth.id, 'id')

    return await BranchRepository.update(id, data)
  }

  public async delete(id): Promise<BranchRepository> {
    await exists('ps_endpoints', 'id', id, 'id')

    return await BranchRepository.delete(id)
  }

  public async show(data): Promise<BranchRepository[]> {
    const item = await BranchRepository.show(data)
    if (!item.length) throw new BadRequestException('Branch not Exists.', 400)
    return item
  }
}
