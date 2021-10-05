import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import MusicOnHold from 'App/Models/MusicOnHold'

export default class MusicOnHoldRepository extends MusicOnHold {
  public static async index(
    page: number,
    limit: number
  ): Promise<MusicOnHold[]> {
    try {
      return await MusicOnHold.query()
        .select('name', 'directory', 'sort')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(
    data: string,
    page: number,
    limit: number
  ): Promise<MusicOnHold[]> {
    try {
      return await MusicOnHold.query()
        .select('name', 'directory', 'sort')
        .where('name', data)
        .orWhere('directory', 'like', `%${data}%`)
        .orWhere('sort', data)
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
