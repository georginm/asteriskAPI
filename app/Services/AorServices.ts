import BadRequestException from 'App/Exceptions/BadRequestException'
import AorRepository from 'App/Repositories/AorRepository'
import { destroy } from 'App/utils/database/destroy'
import { exists } from 'App/utils/database/exists'
import { unique } from 'App/utils/database/unique'

export default class AorServices {
  public async create(data): Promise<AorRepository> {
    await unique('ps_aors', 'id', data.id, 'id')

    return await AorRepository.create(data)
  }

  public async update(data, id): Promise<AorRepository> {
    await exists('ps_aors', 'id', id, 'id')
    const item = await AorRepository.findOrFail(id)

    item.merge(data)
    await item.save()

    return item
  }

  public async destroy(id) {
    return await destroy('ps_aors', 'id', id)
  }

  public async show(data) {
    const item = await AorRepository.show(data)

    if (!item.length) throw new BadRequestException('Aor not Exists', 400)

    return item
  }

  public async index(): Promise<AorRepository[]> {
    const data = await AorRepository.all()

    if (!data.length) throw new BadRequestException('Aor not Exists', 400)

    return data
  }
}
