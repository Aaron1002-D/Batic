/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

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
