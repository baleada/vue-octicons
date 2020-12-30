import { configureable, getIcons } from '@baleada/prepare'

const icons = getIcons({
  set: 'Octicons',
  dirs: ['icons'],
  basePath: 'git_modules/octicons',
})


export default configureable('vite')
  .alias({
    '/@src/': `/src`,
  })
  .koa(configureable => 
    configureable
      .virtual.iconComponentIndex({ icons })
      .virtual.iconComponents({ icons })
      .configure()
  )
  .configure()
