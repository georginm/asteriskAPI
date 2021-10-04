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

  public static async show(data: string): Promise<Extension[]> {
    try {
      return await Extension.query()
        .where('context', data)
        .orWhere('exten', data)
        .orWhere('appdata', 'like', `%${data}%`)
        .orWhere('app', data)
        .orderBy('priority')
        .orderBy('context')
        .orderBy('exten')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  public static async index(): Promise<Extension[]> {
    try {
      return await Extension.query()
        .orderBy('priority')
        .orderBy('context')
        .orderBy('exten')
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
