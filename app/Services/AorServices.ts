import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import AorRepository from 'App/Repositories/AorRepository'
import { destroy, exists, unique } from 'App/utils/database/'

export default class AorServices {
  public async create(data): Promise<AorRepository> {
    await unique('ps_aors', 'id', data.id, 'id')

    try {
      return await AorRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data, id): Promise<AorRepository> {
    await exists('ps_aors', 'id', id, 'id')

    try {
      const item = await AorRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id) {
    return await destroy('ps_aors', 'id', id)
  }

  public async show(data) {
    const item = await AorRepository.show(data)

    if (!item.length) throw new BadRequestException('Aor not Exists')

    return item
  }

  public async index(): Promise<AorRepository[]> {
    const data = await AorRepository.index()

    if (!data.length) throw new BadRequestException('Aor not Exists')

    return data
  }
}
