import Database from '@ioc:Adonis/Lucid/Database'

export const insert = async (
  table: string,
  data: object,
  returning: string = '*'
): Promise<object> => {
  return await Database.table(table).insert(data).returning(returning)
}

export const alreadyExists = async (
  table: string,
  where: object,
  select: string = '*'
): Promise<object> => {
  const exists = await Database.from(table).select(select).where(where)
  return exists.pop()
}

export const selectAll = async (
  table: string,
  where: object,
  select: string = '*'
): Promise<object[]> => {
  const selectAll = await Database.from(table).select(select).where(where)
  return selectAll
}
