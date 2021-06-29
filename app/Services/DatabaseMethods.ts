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
  where: any,
  select: string = '*'
): Promise<object> => {
  const exists = await Database.from(table).select(select).where(where)
  return exists.pop()
}

// export const deletes = async (table: string, where: string) => {
//   const const exists = await Database.from(table).query().where(where)
// }
