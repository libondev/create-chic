import { red } from 'kolorist'
import type { PromptObject } from 'prompts'
import type { ProjectOptionsType } from '../types/index'
import {
  canSafelyOverwrite,
  defaultProjectName,
  isValidPackageName,
  toValidPackageName,
} from './index'

// Options when selecting a new project.
export const chooseProjectOptions = ({ directory, overwrite }: ProjectOptionsType): PromptObject[] => {
  const initialProjectName = directory || defaultProjectName

  return [
    {
      name: 'projectName',
      type: directory ? null : 'text',
      message: 'Project name:',
      initial: initialProjectName,
    },
    {
      name: 'overwrite',
      type: () => ((overwrite || canSafelyOverwrite(directory)) ? null : 'confirm'),
      message: () => {
        const prompt = directory === '.' ? 'Current directory' : `Target directory "${directory}"`

        return `${prompt} is not empty. Remove existing files and continue?`
      },
    },
    {
      name: 'overwriteChecker',
      type: (_, values) => {
        if (values.overwrite === false) {
          throw new Error(`${red('✖')} Operation cancelled`)
        }
        return null
      },
    },
    {
      name: 'packageName',
      type: () => (isValidPackageName(directory) ? null : 'text'),
      message: 'Package name:',
      initial: () => toValidPackageName(directory),
      validate: dir => isValidPackageName(dir) || 'Invalid package.json name',
    },
  ]
}

// Options when you select a new plugins.
export const choosePluginsOptions = (): PromptObject[] => [
  {
    name: 'plugins',
    type: 'multiselect',
    message: 'Select plugins:',
    choices: [
      { title: 'pinia', value: 'pinia', description: 'Add pinia to the project.' },
      { title: 'vitest', value: 'vitest', description: 'Add vitest to the project.' },
      { title: 'typescript', value: 'typescript', description: 'Add typescript to the project.' },
      { title: 'formatters', value: 'formatters', description: 'Add [husky,eslint,commitlint,lint-staged] to the project.' },
    ],
  },
]
