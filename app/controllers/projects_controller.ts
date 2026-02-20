import { HttpContext } from '@adonisjs/core/http'
import Project from '#models/projet' // Ajuste selon ton chemin
import Image from '#models/image' // Ajuste selon ton chemin
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

export default class ProjectsController {
  async index({ view, auth }: HttpContext) {
    await auth.check()
    const projects = await Project.query().preload('images').orderBy('created_at', 'desc')

    const user = auth.user

    console.log(projects)

    return view.render('pages/Projets', { projects, user })
  }
  async store({ request, response, auth, session }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized('Utilisateur non identifié')
    }

    // 1. Récupération des données textuelles
    const data = request.only([
      'name',
      'description',
      'lieu',
      'category',
      'status',
      'facebookUrl',
      'youtubeUrl',
      'instagramUrl',
      'xUrl',
      'tiktokUrl',
    ])

    // 2. Récupération des fichiers (images)
    const images = request.files('images', {
      size: '2mb',
      extnames: ['jpg', 'png', 'webp', 'jpeg'],
    })

    // 3. Validation de la quantité (Exactement 4)
    if (images.length !== 4) {
      session.flash('error', 'Vous devez sélectionner exactement 4 images.')
      return response.redirect().back()
    }

    try {
      // 4. Création du projet
      const project = await Project.create({
        userId: user.id,
        ...data,
      })

      // 5. Traitement et enregistrement des images
      for (let mediaFile of images) {
        if (mediaFile.isValid) {
          // Générer un nom unique pour éviter les doublons
          const fileName = `${cuid()}.${mediaFile.extname}`

          // Déplacer le fichier vers public/uploads
          await mediaFile.move(app.makePath('public/uploads'), {
            name: fileName,
          })

          // Créer l'entrée dans la table Image
          await Image.create({
            url: `uploads/${fileName}`,
            projectId: project.id,
          })
        }
      }

      session.flash('success', 'Projet créé avec succès !')
      return response.redirect().toRoute('Projet')
    } catch (error) {
      console.error('Erreur lors de la création:', error)
      session.flash('error', 'Une erreur est survenue lors de la création du projet.')
      return response.redirect().back()
    }
  }

  //   async store({ request, response, auth, session }: HttpContext) {
  //     const user = auth.user
  //     if (!user) return response.unauthorized('utilisateur non identifié')

  //     const data = request.only([
  //       'name',
  //       'description',
  //       'facebookUrl',
  //       'youtubeUrl',
  //       'instagramUrl',
  //       'xUrl',
  //       'tiktokUrl',
  //     ])

  //     // 1. On récupère les fichiers
  //     const images = request.files('images', {
  //       size: '2mb',
  //       extnames: ['jpg', 'png', 'webp', 'jpeg'],
  //     })

  //     // 2. Vérification stricte du nombre
  //     if (images.length !== 4) {
  //       session.flash(
  //         'error',
  //         `Vous devez envoyer exactement 4 images (Actuellement : ${images.length})`
  //       )
  //       return response.redirect().back()
  //     }

  //     // 3. Vérification de la validité de CHAQUE image avant de commencer
  //     // On regarde si au moins une image a une erreur
  //     let hasErrors = false
  //     for (let image of images) {
  //       if (!image.isValid) {
  //         hasErrors = true
  //         console.error(`Erreur sur le fichier ${image.clientName}:`, image.errors)
  //       }
  //     }

  //     if (hasErrors) {
  //       session.flash(
  //         'error',
  //         'Une ou plusieurs images ne respectent pas les conditions (taille max 2Mo, formats: jpg, png, webp)'
  //       )
  //       return response.redirect().back()
  //     }

  //     try {
  //       // 4. Création du projet
  //       const project = await Project.create({
  //         userId: user.id,
  //         ...data,
  //       })

  //       // 5. Boucle d'enregistrement
  //       for (let mediaFile of images) {
  //         const fileName = `${cuid()}.${mediaFile.extname}`

  //         await mediaFile.move(app.makePath('public/uploads'), {
  //           name: fileName,
  //         })

  //         await Image.create({
  //           url: `uploads/${fileName}`,
  //           projectId: project.id, // Vérifie bien si c'est projectId ou projects_id selon ta correction précédente
  //         })
  //       }

  //       return response.redirect().toRoute('Projet')
  //     } catch (error) {
  //       console.error('Erreur lors de la création:', error)
  //       return response.redirect().back()
  //     }
  //   }
}
