import { join } from 'path'
import {
  copy,
  existsSync,
  mkdirSync,
  readFileSync,
  removeSync,
  writeFileSync,
} from 'fs-extra'
import glob from 'fast-glob'
import type { Answers } from 'prompts'
import type { GeneratorOptionsType } from '../../types/index'
import { BASE_TEMPLATE_PATH, TEMPLATES_PATH } from '../paths'
// import { underlineTransformToDot } from '../index'
import deepMerge from '../deep-merge'

export async function projectGenerator(
  { cwd, root, directory, overwrite }: GeneratorOptionsType,
  args: Answers<string>,
) {
  if (existsSync(directory) && overwrite) {
    removeSync(directory)
  } else if (!existsSync(directory)) {
    mkdirSync(directory)
  }

  await copy(join(BASE_TEMPLATE_PATH), root)
  await pluginsGenerator({ cwd, directory, root }, args)
}

export async function pluginsGenerator(
  { root }: GeneratorOptionsType,
  { plugins }: Answers<string>,
) {
  for (const plugin of plugins) {
    const paths = await glob('**', { cwd: join(TEMPLATES_PATH, plugin) })

    for (const path of paths) {
      if (path === 'package.json') {
        writeFileSync(join(root, path), JSON.stringify(deepMerge(
          JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')),
          JSON.parse(readFileSync(join(TEMPLATES_PATH, plugin, 'package.json'), 'utf8')),
        ), null, 2))
      } else {
        copy(join(TEMPLATES_PATH, plugin, path), join(root, path))
      }
    }
  }
}

export async function generate() {
}
