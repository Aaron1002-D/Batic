import User from '#models/user'
import { connectUserValidator, createUserValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@adonisjs/auth' // Import pour détecter l'erreur précise

export default class AuthController {
  async handleCreation({ response, request, auth }: HttpContext) {
    const { username, password } = await request.validateUsing(createUserValidator)

    const user = await User.create({ username, password })

    await auth.use('web').login(user)

    return response.redirect().toRoute('formulaires')
  }

  async handleconnexion({ request, response, auth, session }: HttpContext) {
    const { username, password } = await request.validateUsing(connectUserValidator)
    console.log('methode appelee')
    console.log('DATA RECUE :', { username, password })

    try {
      const user = await User.verifyCredentials(username, password)
      // Ici, user est forcément valide si on arrive à cette ligne
      await auth.use('web').login(user as User)
      console.log(user)
      return response.redirect().toRoute('formulaires')
    } catch (error) {
      // Si verifyCredentials échoue, on arrive ici
      session.flash('error', 'Identifiants invalides')
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('admin')
  }
}
