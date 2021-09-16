import Database from '@ioc:Adonis/Lucid/Database'
import BadRequestException from 'App/Exceptions/BadRequestException'
import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'

export const destroy = async (
  table: string,
  column: string,
  value: string
): Promise<boolean> => {
  var data
  try {
    data = await Database.from(table).where(column, value).delete()
  } catch (error) {
    throw new InternalServerErrorException(error.message)
  }

  if (!data) {
    throw new BadRequestException(
      `The ${column} register does not exist in the ${table} table.`
    )
  }

  return true
}
