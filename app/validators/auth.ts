import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().maxLength(32),
    password: vine.string().trim().minLength(5).maxLength(12),
  })
)

export const connectUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().maxLength(32),
    password: vine.string().trim().minLength(5).maxLength(32),
  })
)
