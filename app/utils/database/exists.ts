import Database from '@ioc:Adonis/Lucid/Database'
import BadRequestException from 'App/Exceptions/BadRequestException'

export const exists = async (
  table: string,
  column: string,
  value: any,
  select: string = '*'
): Promise<void> => {
  const data = await Database.from(table).select(select).where(column, value)

  if (!data.length) {
    throw new BadRequestException(
      `The ${column} register in the ${table} table does not exist`
    )
  }
}
