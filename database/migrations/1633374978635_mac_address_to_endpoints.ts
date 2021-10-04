import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MacAddressToEndpoints extends BaseSchema {
  protected tableName = 'ps_endpoints'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('mac_address', 17)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('mac_address')
    })
  }
}
