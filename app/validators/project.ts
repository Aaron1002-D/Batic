import vine from '@vinejs/vine'

// export const createProjectValidator = vine.compile(
//   vine.object({
//     name: vine.string().trim().minLength(3),
//     description: vine.string().trim(),
//     facebook_url: vine.string().url().optional(),

//     // LA RÈGLE DES 4 PHOTOS
//     images: vine
//       .array(
//         vine.file({
//           size: '2mb',
//           extnames: ['jpg', 'png', 'jpeg', 'webp'],
//         })
//       )
//       .getLength(4), // <--- FORCE EXACTEMENT 4 ÉLÉMENTS
//   })
// )
