import Database from '@ioc:Adonis/Lucid/Database'
import BadRequestException from 'App/Exceptions/BadRequestException'
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
    throw new BadRequestException(
      `O campo ${column} deve ser único na tabela ${table}.`,
      400
    )
  }
}
