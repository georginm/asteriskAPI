import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'

export const destroy = async (
  table: string,
  column: string,
  value: string
): Promise<boolean> => {
  const data = await Database.from(table).where(column, value).delete()

  if (!data) {
    throw new Exception(`O registro de ${column} não existe.`, 400)
  }

  return true
}
