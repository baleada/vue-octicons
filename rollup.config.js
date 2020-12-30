import { configureable, getIcons } from '@baleada/prepare'

const icons = getIcons({
  set: 'Octicons',
  dirs: ['icons'],
  basePath: 'git_modules/octicons',
})

export default [
  configureable('rollup')
    .delete({ targets: 'lib/*' })
    .input('src/index.js')
    .resolve()
    .external([/^vue$/])
    .virtual.iconComponentIndex({ icons })
    .virtual.iconComponents({ icons })
    .vue()
    .esm({ file: 'lib/index.js', target: 'browser' })
    // .analyze()
    .configure()
]
