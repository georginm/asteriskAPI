import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Auth extends BaseModel {
  public static table = 'ps_auths'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'auth_type' })
  public authType: string

  @column()
  public username: string

  @column()
  public password: string
}
