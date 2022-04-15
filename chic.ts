#!/usr/bin/env node

import { join } from 'path'
import prompts from 'prompts'
import { red } from 'kolorist'
import minimist from 'minimist'

import {
  choosePluginsOptions,
  chooseProjectOptions,
} from './utils/prompts'

import {
  pluginsGenerator,
  projectGenerator,
} from './utils/generators'

import type { OperatingType } from './types/index'

async function bootstrap(): Promise<void> {
  const cwd = process.cwd()
  const argv = minimist(process.argv.slice(2), { boolean: true })
  const overwrite = argv.overwrite
  const directory = argv._[0] || argv.projectName
  const root = join(cwd, directory)

  const type: OperatingType = argv.type || (await prompts({
    name: 'type',
    type: 'select',
    message: 'Choose a type',
    choices: [
      { title: 'project', value: 'project', description: 'Create a new project.' },
      { title: 'plugins', value: 'plugins', description: 'Add plugins to existing projects' },
    ],
  })).type

  if (type === 'project') {
    return projectGenerator(
      { cwd, directory, overwrite, root },
      await prompts([
        ...chooseProjectOptions({ directory, overwrite }),
        ...choosePluginsOptions(),
      ]),
    )
  }

  if (type === 'plugins') {
    return pluginsGenerator(
      { cwd, directory, root },
      await prompts(choosePluginsOptions()),
    )
  }

  // eslint-disable-next-line no-console
  console.log(red('Unknown operating type.'))
}

bootstrap().catch(console.error)
