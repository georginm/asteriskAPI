import Extension from 'App/Models/Extension'
import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'

export default class ExtensionRepository extends Extension {
  /**
   * @param priority
   * @param context
   * @param exten
   */
  public static async uniquePerExtension(
    priority: string,
    context: string,
    exten: string
  ): Promise<boolean> {
    const result = await Extension.query()
      .where('context', context)
      .where('exten', exten)
      .where('priority', priority)

    if (result.length)
      throw new BadRequestException(
        'The context, exten and priority fields must be unique by extension.'
      )

    return true
  }

  /**
   *
   * @param data
   * @param page
   * @param limit
   * @returns
   */
  public static async index(id: string): Promise<Extension[]> {
    try {
      return await Extension.query().where('id', id).paginate(1, 1)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async show(
    page: number,
    limit: number,
    filter: string | null
  ): Promise<Extension[]> {
    try {
      return await Extension.query()
        .if(filter, (query) => {
          query
            .where('context', 'ilike', `%${filter}%`)
            .orWhere('exten', 'ilike', `%${filter}%`)
            .orWhere('appdata', 'ilike', `%${filter}%`)
            .orWhere('app', 'ilike', `%${filter}%`)
        })
        .orderBy('context')
        .orderBy('exten')
        .orderBy('priority')
        .paginate(page, limit)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
