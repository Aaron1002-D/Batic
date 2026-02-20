import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.string('lieu').nullable()
      table.string('category').notNullable()
      table.string('status').notNullable()

      // Réseaux sociaux
      table.string('facebook_url').nullable()
      table.string('youtube_url').nullable()
      table.string('instagram_url').nullable()
      table.string('x_url').nullable()
      table.string('tiktok_url').nullable()

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
