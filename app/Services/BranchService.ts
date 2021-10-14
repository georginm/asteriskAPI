import BadRequestException from 'App/Exceptions/BadRequestException'
import BranchRepository from 'App/Repositories/BranchRepository'
import { exists, unique } from 'App/utils/database/'

export default class BranchService {
  public async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<BranchRepository[]> {
    const data = await BranchRepository.index(page, limit, filter)
    if (!data.length) throw new BadRequestException('Branch not Exists.')
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

    await unique(BranchRepository.t_endpoint, 'id', data.endpoint.id, 'id')
    await unique(BranchRepository.t_endpoint, 'auth', data.endpoint.auth, 'id')
    await unique(BranchRepository.t_endpoint, 'aors', data.endpoint.aors, 'id')
    await unique(
      BranchRepository.t_endpoint,
      'mac_address',
      data.endpoint.macAddress,
      'id'
    )

    await unique(BranchRepository.t_auth, 'id', data.auth.id, 'id')
    await unique(BranchRepository.t_auth, 'username', data.auth.username)

    await unique(BranchRepository.t_aor, 'id', data.aor.id, 'id')

    return await BranchRepository.create(data)
  }

  public async update(data, id): Promise<BranchRepository> {
    // Nenhum dos ids pode vir no corpo da requisição.
    if (data.endpoint.id || data.auth.id || data.aor.id)
      throw new BadRequestException(
        'Cannot change id of endpoint, aor or auth.'
      )

    await exists(BranchRepository.t_endpoint, 'id', id)

    // await unique(BranchRepository.t_endpoint, 'auth', data.endpoint.auth, 'id')
    // await unique(BranchRepository.t_endpoint, 'aors', data.endpoint.aors, 'id')
    await unique(
      BranchRepository.t_endpoint,
      'mac_address',
      data.endpoint.macAddress
    )
    await unique(BranchRepository.t_auth, 'username', data.auth.username)

    // await unique(BranchRepository.t_aor, 'id', data.aor.id, 'id')
    // await unique(BranchRepository.t_auth, 'id', data.auth.id, 'id')

    return await BranchRepository.update(id, data)
  }

  public async delete(id): Promise<BranchRepository> {
    await exists(BranchRepository.t_endpoint, 'id', id)

    return await BranchRepository.delete(id)
  }

  public async show(id: string): Promise<BranchRepository[]> {
    const item = await BranchRepository.show(id)
    if (!item[0].branch.endpoint)
      throw new BadRequestException('Branch not Exists.')
    return item
  }
}
