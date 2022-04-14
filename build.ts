import { build } from 'esbuild'

async function bootstrap() {
  await build({
    bundle: true,
    format: 'cjs',
    platform: 'node',
    target: 'node14',
    outfile: 'dist/chic.cjs',
    entryPoints: ['chic.ts'],
  })
}

bootstrap().catch(console.error)
