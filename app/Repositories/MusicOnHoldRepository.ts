import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import MusicOnHold from 'App/Models/MusicOnHold'

export default class MusicOnHoldRepository extends MusicOnHold {
  public static async index(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<MusicOnHold[]> {
    try {
      return await MusicOnHold.query()
        .select('name', 'directory', 'sort')
        .if(filter, (query) => {
          query
            .where('name', 'ilike', `%${filter}%`)
            .orWhere('directory', 'ilike', `%${filter}%`)
            .orWhere('sort', 'ilike', `%${filter}%`)
        })
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(name: string): Promise<MusicOnHold[]> {
    try {
      return await MusicOnHold.query()
        .where('name', 'ilike', `${name}`)
        .paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
