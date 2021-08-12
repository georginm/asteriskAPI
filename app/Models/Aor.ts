import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Aor extends BaseModel {
  public static table = 'ps_aors'

  @column({ isPrimary: true })
  public id: string

  @column()
  public contact: string

  @column({ columnName: 'max_contacts' })
  public maxContacts: number
}
