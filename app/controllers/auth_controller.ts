import User from '#models/user'
import { connectUserValidator, createUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async handlCreation({ response, request }: HttpContext) {
    const { username, password } = await request.validateUsing(createUserValidator)

    const user = await User.create({ username, password })

    return response.redirect().toRoute('formulaires')
  }

  //   async handlconnexion({ request, response, auth }: HttpContext) {
  //     const { userName, password } = await request.validateUsing(connectUserValidator)
  //   }
}
