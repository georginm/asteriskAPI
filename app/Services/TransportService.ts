import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import TransportRepository from 'App/Repositories/TransportRepository'
import { destroy, exists, unique } from 'App/utils/database'
import { pagination } from 'App/utils/pagination'

export default class TransportService {
  public async create(data: any): Promise<TransportRepository> {
    unique(TransportRepository.table, 'id', data.id, 'id')

    try {
      return await TransportRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data: any, id: string): Promise<TransportRepository> {
    await exists(TransportRepository.table, 'id', id, 'id')

    try {
      const item = await TransportRepository.findOrFail(id)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id: string) {
    return await destroy(TransportRepository.table, 'id', id)
  }

  public async show(data: string, page: number) {
    const limit = pagination()

    const item = await TransportRepository.show(data, page, limit)

    if (!item.length) throw new BadRequestException('Transport not Exists')

    return item
  }

  public async index(page: number): Promise<TransportRepository[]> {
    const limit = pagination()

    const data = await TransportRepository.index(page, limit)

    if (!data.length) throw new BadRequestException('Transport not Exists')

    return data
  }
}
