import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import MusicOnHoldRepository from 'App/Repositories/MusicOnHoldRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class MusicOnHoldService {
  public async index(): Promise<MusicOnHoldRepository[]> {
    const data = await MusicOnHoldRepository.index()

    if (!data.length) throw new BadRequestException('MusicOnHold not exits')

    return data
  }

  public async show(data): Promise<MusicOnHoldRepository[]> {
    const item = await MusicOnHoldRepository.show(data)

    if (!item.length) throw new BadRequestException('MusicOnHold not Exists')

    return item
  }

  public async create(data): Promise<MusicOnHoldRepository> {
    await unique(MusicOnHoldRepository.table, 'name', data.name)

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
