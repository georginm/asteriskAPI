import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
/**
 * @param table
 * @param column
 * @param value
 * @param select
 * @returns void
 */
export const unique = async (
  table: string,
  column: string,
  value: string,
  select: string = '*'
): Promise<void> => {
  const data = await Database.from(table)
    .select(select)
    .where(column, '=', value)

  if (data.length) {
    throw new Exception(`O campo ${column} deve ser único.`, 400)
  }
}
