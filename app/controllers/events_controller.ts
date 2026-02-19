import type { HttpContext } from '@adonisjs/core/http'
import Event from '#models/event'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import Image from '#models/image'

export default class EventsController {
  async index({ view, auth }: HttpContext) {
    await auth.check()
    const events = await Event.query().preload('images').orderBy('created_at', 'desc')

    const user = auth.user

    return view.render('pages/evenement', { events, user })
  }

  async store({ request, response, session, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized("l'utilisateur n'est auhtentifié")
    }

    const data = request.only([
      'title',
      'description',
      'lieu',
      'facebookUrl',
      'youtubeUrl',
      'instagramUrl',
      'xUrl',
      'tiktokUrl',
    ])

    const images = request.files('images', {
      size: '2mb',
      extnames: ['jpg', 'png', 'webp', 'jpeg'],
    })

    if (images.length !== 4) {
      session.flash('error', 'Vous devez sélectionner exactement 4 images.')
    }

    try {
      const event = await Event.create({
        userId: user.id,
        ...data,
      })

      for (let mediaFile of images) {
        if (mediaFile.isValid) {
          const fileName = `${cuid()}-${mediaFile.extname}`

          await mediaFile.move(app.makePath('public/uploads'), {
            name: fileName,
          })

          await Image.create({
            eventId: event.id,
            url: `uploads/${fileName}`,
          })
        }
      }

      session.flash('success', 'Event créé avec succès !')
      return response.redirect().toRoute('events')
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      session.flash('error', 'Une erreur est survenue lors de la création du projet.')
      return response.redirect().back()
    }
  }

  async destroy({ request, response, auth }: HttpContext) {
    const user = auth.user

    if (!user) {
      return response.unauthorized('utilisateur non authenfié')
    }

    const eventId = request.input('event_id')

    console.log('ID event à supprimer (depuis input caché):', eventId)

    if (!eventId) {
      return response.badRequest("l'id de l'event est manquant")
    }

    try {
      const event = await Event.findOrFail(eventId)

      await event.related('images').query().delete()

      await event.delete()

      return response.redirect().toRoute('events')
    } catch (error) {
      console.error('Erreur lors de la suppression du event:', error)
      return response.internalServerError(
        'Une erreur est survenue lors de la suppression du event.'
      )
    }
  }
}
