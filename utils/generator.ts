import { join } from 'path'
import fs from 'fs-extra'
import glob from 'fast-glob'
import type { Answers } from 'prompts'
import type { GeneratorOptionsType } from '../types/index'
import { emptyTargetDirectory, underlineToDot } from './index'

export async function projectGenerator(
  { cwd, directory }: GeneratorOptionsType,
  args: Answers<string>,
) {
  if (args.overwrite) {
    emptyTargetDirectory(directory)
  }

  const projectRoot = join(cwd, directory)
  const currentRoot = join(__dirname, '../')

  await fs.mkdir(directory)
  const baseTemplateFilePaths = await glob('**', { cwd: join(currentRoot, 'templates/base') })

  for (const filePath of baseTemplateFilePaths) {
    const fileContent = await fs.readFile(join(currentRoot, 'templates/base', filePath), 'utf8')

    fs.writeFile(join(projectRoot, underlineToDot(filePath)), fileContent)
  }

  pluginsGenerator({ cwd, directory }, args)
}

export async function pluginsGenerator(
  { cwd }: GeneratorOptionsType,
  args: Answers<string>,
) {
  // eslint-disable-next-line no-console
  console.log(cwd, args)
}
