// app/models/user.ts

import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, beforeSave, hasMany } from '@adonisjs/lucid/orm' // <--- Ajout de hasMany
import type { HasMany } from '@adonisjs/lucid/types/relations' // <--- Ajout du type
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

// Importation différée pour éviter les cycles de dépendance
import Projet from './projet.js'
import Event from './event.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column({ serializeAs: null })
  declare password: string

  // --- RELATIONS ---

  @hasMany(() => Projet)
  declare projects: HasMany<typeof Projet>

  @hasMany(() => Event)
  declare events: HasMany<typeof Event>

  // --- FIN RELATIONS ---

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
