// app/models/project.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  // Réseaux sociaux
  @column()
  declare facebookUrl: string | null

  @column()
  declare youtubeUrl: string | null

  @column()
  declare instagramUrl: string | null

  @column()
  declare xUrl: string | null

  // Clé étrangère
  @column()
  declare userId: number

  // Relation inverse : Le projet appartient à un User
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
