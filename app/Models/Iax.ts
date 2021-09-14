import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Iax extends BaseModel {
  public static table = 'iaxfriends'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public username: string

  @column()
  public secret: string

  // @column()
  // public dbsecret: string

  @column()
  public context: string

  // @column()
  // public regcontext: string

  @column()
  public host: string

  @column()
  public ipaddr: string

  @column()
  public port: number

  // @column()
  // public defaultip: string

  // @column()
  // public sourceaddress: string

  // @column()
  // public mask: string

  // @column()
  // public regexten: string

  @column()
  public regseconds: number

  // @column()
  // public accountcode: string

  // @column()
  // public mohinterpret: string

  // @column()
  // public mohsuggest: string

  // @column()
  // public inkeys: string

  // @column()
  // public outkeys: string

  // @column()
  // public language: string

  @column()
  public callerid: string

  // @column({ columnName: 'cid_number' })
  // public cidNumber: string

  // @column()
  // public sendani: string

  // @column()
  // public fullname: string

  @column()
  public trunk: string

  // @column()
  // public auth: string

  // @column()
  // public maxauthreq: number

  @column()
  public requirecalltoken: string

  // @column()
  // public encryption: string

  @column()
  public transfer: string

  @column()
  public jitterbuffer: string

  @column()
  public forcejitterbuffer: string

  @column()
  public disallow: string

  @column()
  public allow: string

  // @column()
  // public codecpriority: string

  @column()
  public qualify: string

  // @column()
  // public qualifysmoothing: string

  // @column()
  // public qualifyfreqok: string

  // @column()
  // public qualifyfreqnotok: string

  @column()
  public timezone: string

  // @column()
  // public adsi: string

  // @column()
  // public amaflags: string

  // @column()
  // public setvar: string
}
