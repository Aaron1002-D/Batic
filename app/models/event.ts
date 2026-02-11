// app/models/event.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Image from './image.js'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

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

  @column()
  declare userId: number

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
