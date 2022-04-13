import fs from 'fs-extra'
import type { Answers } from 'prompts'
import type { GeneratorOptionsType } from '../types/index'
import { emptyTargetDirectory } from './index'

export async function projectGenerator(
  { cwd, directory }: GeneratorOptionsType,
  args: Answers<string>,
) {
  // eslint-disable-next-line no-console
  console.log(cwd, directory, args)
  if (args.overwrite) {
    emptyTargetDirectory(directory)
  }

  await fs.mkdir(directory)
}

export function pluginsGenerator(
  { cwd }: GeneratorOptionsType,
  args: Answers<string>,
) {
  // eslint-disable-next-line no-console
  console.log(cwd, args)
}
