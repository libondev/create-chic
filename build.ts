import { build } from 'esbuild'

async function bootstrap() {
  await build({
    bundle: true,
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    outfile: 'dist/chic.cjs',
    entryPoints: ['bin/chic.ts'],
  })

  // await build({
  //   bundle: true,
  //   format: 'esm',
  //   platform: 'node',
  //   target: 'node14',
  //   outfile: 'dist/chic.mjs',
  //   entryPoints: ['bin/chic.ts'],
  // })

  await build({
    bundle: true,
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    outfile: 'dist/lib.cjs',
    entryPoints: ['bin/lib.ts'],
  })

  // await build({
  //   bundle: true,
  //   format: 'esm',
  //   platform: 'node',
  //   target: 'node14',
  //   outfile: 'dist/lib.mjs',
  //   entryPoints: ['bin/lib.ts'],
  // })
}

bootstrap().catch(console.error)
