import Extension from 'App/Models/Extension'
import { Exception } from '@adonisjs/core/build/standalone'

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

    if (result.length) return false
    return true
  }

  /**
   * @param id
   * @returns Extension
   */
  public static async select(id: number) {
    return await Extension.find(id)
  }

  public static async list(where: object): Promise<Array<Extension>> {
    const data = await Extension.query()
      .select('*')
      .where(where)
      .orderBy('context')
      .orderBy('priority')

    if (!data.length) {
      throw new Exception(
        'Não há registros com as informações fornecidas.',
        400
      )
    }

    return data
  }
}
