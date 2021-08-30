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
  public static async select(id: number): Promise<Extension | null> {
    return await Extension.find(id)
  }

  public static async show(data: string): Promise<Array<Extension>> {
    try {
      return await Extension.query()
        .where('context', data)
        .orWhere('exten', data)
        .orWhere('appdata', data)
        .orWhere('app', data)
        .orderBy('context')
        .orderBy('priority')
    } catch (error) {
      throw new Exception(error.routine, 500)
    }
  }
}
