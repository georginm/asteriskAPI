import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import MusicOnHold from 'App/Models/MusicOnHold'

export default class MusicOnHoldRepository extends MusicOnHold {
  public static async index(): Promise<MusicOnHold[]> {
    try {
      return await MusicOnHold.query()
        .select('name', 'directory', 'sort')
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(data): Promise<MusicOnHold[]> {
    try {
      return await MusicOnHold.query()
        .select('name', 'directory', 'sort')
        .where('name', data)
        .orWhere('directory', 'like', `%${data}%`)
        .orWhere('sort', data)
        .paginate(1, 20)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
