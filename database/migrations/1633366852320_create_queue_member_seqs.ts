import Database from '@ioc:Adonis/Lucid/Database'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CreateQueueMemberSeqs extends BaseSchema {
  protected tableName = 'create_queue_member_seqs'

  public async up() {
    await Database.rawQuery(
      'CREATE SEQUENCE IF NOT EXISTS queue_members_seq  owned by queue_members.uniqueid'
    )

    await Database.rawQuery(
      "SELECT setval('queue_members_seq', coalesce(max(uniqueid), 0) + 1, false) FROM queue_members"
    )

    await Database.rawQuery(
      "ALTER TABLE queue_members alter column uniqueid SET DEFAULT nextval('queue_members_seq')"
    )
  }

  public async down() {
    await Database.rawQuery(
      'ALTER TABLE queue_members alter column uniqueid SET DEFAULT NULL'
    )

    await Database.rawQuery('DROP SEQUENCE IF EXISTS queue_members_seq')
  }
}
