import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import AorRepository from 'App/Repositories/AorRepository'
import { destroy, exists, unique } from 'App/utils/database/'

export default class AorServices {
  public async create(data: any): Promise<AorRepository> {
    await unique(AorRepository.table, 'id', data.id, 'id')

    try {
      return await AorRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(item: any, id: string): Promise<AorRepository> {
    await exists(AorRepository.table, 'id', id, 'id')

    try {
      const data = await AorRepository.findOrFail(id)
      return await data.merge(item).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id: string) {
    return await destroy(AorRepository.table, 'id', id)
  }

  public async show(id: string) {
    const item = await AorRepository.show(id)

    if (!item.length) throw new BadRequestException('Aor not Exists')

    return item
  }

  public async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<AorRepository[]> {
    const data = await AorRepository.index(page, limit, filter)
    if (!data.length) throw new BadRequestException('Aor not Exists')

    return data
  }
}
