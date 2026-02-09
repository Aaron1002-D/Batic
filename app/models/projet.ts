// app/models/project.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Image from './image.js'

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

  @column()
  declare tiktokUrl: string | null

  // Clé étrangère
  @column()
  declare userId: number

  // Relation inverse : Le projet appartient à un User
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  /** 📸 Un event peut avoir plusieurs photos */
  @hasMany(() => Image)
  declare medias: HasMany<typeof Image>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
