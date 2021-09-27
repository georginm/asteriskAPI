import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import RegistrationRepository from 'App/Repositories/RegistrationRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class RegistrationService {
  public async index(): Promise<RegistrationRepository[]> {
    const data = await RegistrationRepository.index()

    if (!data.length) throw new BadRequestException('Registration not Exists')

    return data
  }

  public async show(data): Promise<RegistrationRepository[]> {
    const item = await RegistrationRepository.show(data)

    if (!item.length) throw new BadRequestException('Registration not Exists')

    return item
  }

  public async create(data): Promise<RegistrationRepository> {
    await unique(RegistrationRepository.table, 'id', data.id)
    await unique(RegistrationRepository.table, 'endpoint', data.endpoint)

    try {
      return await RegistrationRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id) {
    return await destroy(RegistrationRepository.table, 'id', id)
  }

  public async update(data, id): Promise<RegistrationRepository> {
    await exists(RegistrationRepository.table, 'id', id)

    if (data.endpoint)
      await unique(RegistrationRepository.table, 'endpoint', data.endpoint)

    try {
      return await (await RegistrationRepository.findOrFail(id))
        .merge(data)
        .save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
