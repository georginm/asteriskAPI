import Database from '@ioc:Adonis/Lucid/Database'
import BadRequestException from 'App/Exceptions/BadRequestException'

export const exists = async (
  table: string,
  column: string,
  value: string,
  select: string = '*'
): Promise<void> => {
  const data = await Database.from(table).select(select).where(column, value)

  if (!data.length) {
    throw new BadRequestException(
      `O registro de ${column} na tabela ${table} não existe.`,
      400
    )
  }
}
