import Database from '@ioc:Adonis/Lucid/Database'
import BadRequestException from 'App/Exceptions/BadRequestException'

export const destroy = async (
  table: string,
  column: string,
  value: string
): Promise<boolean> => {
  const data = await Database.from(table).where(column, value).delete()
  if (!data) {
    throw new BadRequestException(
      `The ${column} register does not exist in the ${table} table.`,
      400
    )
  }

  return true
}
