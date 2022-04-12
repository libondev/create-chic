import { build } from 'esbuild'

async function bootstrap() {
  await build({
    bundle: true,
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    outfile: 'dist/index.cjs',
    entryPoints: ['index.ts'],
  })

  await build({
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node14',
    outfile: 'dist/index.mjs',
    entryPoints: ['index.ts'],
  })
}

bootstrap().catch(console.error)
