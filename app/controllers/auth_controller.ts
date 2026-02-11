import User from '#models/user'
import { connectUserValidator, createUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import { errors } from '@adonisjs/auth' // Import pour détecter l'erreur précise

export default class AuthController {
  async handleCreation({ response, request, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(createUserValidator)

    const user = await User.create({ email, password })

    await auth.use('web').login(user)

    return response.redirect().toRoute('formulaires')
  }

  async handleconnexion({ request, response, auth }: HttpContext) {
    // return 'je suis dans le controller'
    try {
      const { email, password } = request.only(['email', 'password'])

      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)
      return response.redirect().toRoute('formulaires')
    } catch (error) {
      // On arrête tout et on affiche l'erreur brute
      return response.json({
        message: 'Erreur de connexion',
        error: error.message,
        code: error.code, // Très important pour Adonis
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('admin')
  }
}
