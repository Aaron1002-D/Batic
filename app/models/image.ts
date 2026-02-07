// app/models/image.ts

import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from './projet.js'
import Event from '#models/event'

export default class Image extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string

  /**
   * Relation avec le Projet
   */
  @column()
  declare projectId: number | null

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  /**
   * Relation avec l'Événement
   */
  @column()
  declare eventId: number | null

  @belongsTo(() => Event)
  declare event: BelongsTo<typeof Event>

  /**
   * Timestamps
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
