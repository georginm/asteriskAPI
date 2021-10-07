import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import MusicOnHoldRepository from 'App/Repositories/MusicOnHoldRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class MusicOnHoldService {
  public async show(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<MusicOnHoldRepository[]> {
    const data = await MusicOnHoldRepository.show(page, limit, filter)

    if (!data.length) throw new BadRequestException('MusicOnHold not Exists')

    return data
  }

  public async index(name: string): Promise<MusicOnHoldRepository[]> {
    const item = await MusicOnHoldRepository.index(name)

    if (!item.length) throw new BadRequestException('MusicOnHold not Exists')

    return item
  }

  public async create(data): Promise<MusicOnHoldRepository> {
    await unique(MusicOnHoldRepository.table, 'name', data.name)
    console.log(data)
    try {
      return await MusicOnHoldRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data, name): Promise<MusicOnHoldRepository> {
    await exists(MusicOnHoldRepository.table, 'name', name)

    try {
      const item = await MusicOnHoldRepository.findByOrFail('name', name)
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async delete(name): Promise<boolean> {
    return await destroy(MusicOnHoldRepository.table, 'name', name)
  }
}
