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

router.on('/').render('pages/home')
router
  .get('/projets', async ({ view }) => {
    return view.render('pages/Projets')
  })
  .as('Projet')

router
  .get('/events', async ({ view }) => {
    return view.render('pages/evenement')
  })
  .as('events')

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
  .get('/admin', async ({ view }) => {
    return view.render('pages/admin')
  })
  .as('admin')

router
  .get('/formulaires', async ({ view }) => {
    return view.render('pages/formulaires')
  })
  .as('formulaires')

router.post('/create', [AuthController, 'handlCreation']).as('auth.creation')

router.post('/connect', [AuthController, 'handlconnexion']).as('auth.connexion')
