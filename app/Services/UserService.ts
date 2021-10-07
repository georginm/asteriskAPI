import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import UserRepository from 'App/Repositories/UserRepository'

export default class UserServices {
  public async create(data): Promise<UserRepository> {
    try {
      return await UserRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async update(data, id: string): Promise<UserRepository> {
    const item = await UserRepository.findOrFail(id)

    try {
      return await item.merge(data).save()
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public async destroy(id: string): Promise<string> {
    const item = await UserRepository.find(id)

    if (!item) throw new BadRequestException('User not Exists.')

    await item.delete()

    return 'User has been deleted.'
  }

  public async show(
    filter: string,
    page: number,
    limit: number
  ): Promise<UserRepository[]> {
    const item = await UserRepository.index(filter, page, limit)
    if (!item) throw new BadRequestException('User not Exists.')

    return item
  }

  public async index(page: number, limit: number): Promise<UserRepository[]> {
    const data = await UserRepository.show(page, limit)

    if (!data.length) throw new BadRequestException('User not Exists.')

    return data
  }
}
