#!/usr/bin/env node

import prompts from 'prompts'
import { red } from 'kolorist'
import minimist from 'minimist'

import {
  chooseOperateType,
  choosePluginsOptions,
  chooseProjectOptions,
} from './utils/prompts'

import {
  pluginsGenerator,
  projectGenerator,
} from './utils/generator'

import type { OperatingType } from './types/index'

async function bootstrap(): Promise<void> {
  const cwd = process.cwd()
  const argv = minimist(process.argv.slice(2), { boolean: true })
  const type: OperatingType = argv.type || (await prompts(chooseOperateType)).type

  const overwrite = argv.overwrite
  const directory = argv._[0] || argv.projectName || '.'

  if (type === 'project') {
    return projectGenerator(
      cwd,
      await prompts(chooseProjectOptions({ directory, overwrite })),
    )
  }

  if (type === 'plugins') {
    return pluginsGenerator(
      cwd,
      await prompts(choosePluginsOptions()),
    )
  }

  // eslint-disable-next-line no-console
  console.log(red('Unknown operating type.'))
  process.exit(1)
}

bootstrap().catch(console.error)
