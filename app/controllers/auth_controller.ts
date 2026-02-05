import User from '#models/user'
import { connectUserValidator, createUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async handlCreation({ response, request }: HttpContext) {
    const { username, password } = await request.validateUsing(createUserValidator)

    const user = await User.create({ username, password })

    return response.redirect().toRoute('formulaires')
  }

  async handlconnexion({ request, response, auth }: HttpContext) {
    const { username, password } = await request.validateUsing(connectUserValidator)

    const user = await User.verifyCredentials(username, password)

    if (!user) {
      return response.redirect().back()
    }

    await auth.use('web').login(user)
    return response.redirect().toRoute('formulaires')
  }
}
