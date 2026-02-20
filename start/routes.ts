/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import ProjectsController from '#controllers/projects_controller'
import EventsController from '#controllers/events_controller'
import User from '#models/user'

router.on('/').render('pages/home').as('home')
router.get('/projets', [ProjectsController, 'index']).as('Projet')

router.get('/events', [EventsController, 'index']).as('events')

router
  .get('/equipe', async ({ view }) => {
    return view.render('pages/equipe')
  })
  .as('team')

router
  .get('/contact', async ({ view }) => {
    return view.render('pages/contact')
  })
  .as('contact')

router
  .get('/admin', async ({ view, auth, response }) => {
    if (await auth.use('web').check()) {
      return response.redirect().toRoute('formulaires')
    }
    return view.render('pages/admin')
  })
  .as('admin')

router
  .get('/formulaires', async ({ view }) => {
    return view.render('pages/formulaires')
  })
  .as('formulaires')
  .use(middleware.auth())

router.post('/create', [AuthController, 'handleCreation']).as('auth.creation')

router.post('/connect', [AuthController, 'handleconnexion']).as('auth.connexion')

router.post('/logout', [AuthController, 'logout']).as('auth.logout')

// routes pour poster un porjet

router.post('/post-projet', [ProjectsController, 'store']).as('post.projet').use(middleware.auth())

// routes pour traiter un evenement

router.post('/post-event', [EventsController, 'store']).as('post.event').use(middleware.auth())

router.delete('/events', [EventsController, 'destroy']).as('event.destroy').use(middleware.auth())

router.put('/events/:id', [EventsController, 'update']).as('events.update')

// routes test pour debug

router.post('/test', () => {
  console.log('TEST ROUTE OK')
})

router.get('/test-create', async () => {
  const user = new User()
  user.email = 'test@test.com'
  user.password = 'password123' // Il sera haché automatiquement par le hook @beforeSave
  await user.save()
  return 'Utilisateur test créé avec password123'
})

router.get('/test-auth', async ({ auth }) => {
  console.log(auth)
  return 'ok'
})
