import { build } from 'esbuild'

build({
  bundle: true,
  format: 'cjs',
  platform: 'node',
  target: 'node14',
  outfile: 'dist/chic.cjs',
  entryPoints: ['chic.ts'],
}).catch(console.error)
