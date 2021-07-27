import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'

export const exists = async (
  table: string,
  column: string,
  value: string,
  key: string,
  select: string = '*'
): Promise<void> => {
  const data = await Database.from(table)
    .select(select)
    .where(column, '=', value)

  if (!data.length) {
    throw new Exception(`O registro de ${key} não existe.`, 400)
  }
}
