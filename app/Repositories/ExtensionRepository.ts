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
  ): Promise<void> {
    const result = await Extension.query()
      .where('context', context)
      .where('exten', exten)
      .where('priority', priority)

    if (result.length)
      throw new Exception(
        'Os campos context, exten e priority devem ser únicos por extension.',
        400
      )
  }

  /**
   * @param id
   * @returns Extension
   */
  public static async select(id: number) {
    return await Extension.find(id)
  }
}
