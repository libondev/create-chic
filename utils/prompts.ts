import { red } from 'kolorist'
import type { PromptObject } from 'prompts'
import type { ProjectOptionsType } from '../types/index'
import { canSafelyOverwrite, defaultProjectName } from './index'

// If --type is not specified during initialization,
// you need to manually select it.
export const chooseOperateType: PromptObject = {
  name: 'type',
  type: 'select',
  message: 'Choose a type',
  choices: [
    { title: 'project', value: 'project', description: 'Create a new project.' },
    { title: 'plugins', value: 'plugins', description: 'Add plug-ins to existing projects' },
  ],
}

// Options when selecting a new project.
export const chooseProjectOptions = ({ directory, overwrite }: ProjectOptionsType): PromptObject[] => {
  const initialProjectName = directory || defaultProjectName

  return [
    {
      name: 'projectName',
      type: 'text',
      message: 'Project name:',
      initial: initialProjectName,
    },
    {
      name: 'overwrite',
      type: () => ((canSafelyOverwrite(directory) || overwrite) ? null : 'confirm'),
      message: () => {
        const prompt = directory === '.' ? 'Current directory' : `Target directory "${directory}"`

        return `${prompt} is not empty. Remove existing files and continue?`
      },
    },
    {
      name: 'overwriteChecker',
      type: (_, values) => {
        if (values.shouldOverwrite === false) {
          throw new Error(`${red('✖')} Operation cancelled`)
        }
        return null
      },
    },
  ]
}

// Options when you select a new plugins.
export const choosePluginsOptions = (): PromptObject[] => [
  {
    name: 'store',
    type: 'select',
    message: 'Store type:',
    choices: [
      { title: 'pinia', value: 'pinia', description: 'Add pinia@2 to the project.' },
      { title: 'vuex', value: 'vuex', description: 'Add vuex@4 to the project.' },
    ],
  },
]
