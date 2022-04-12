import { defaultProjectName } from './project'

export const prompts = [
  {
    name: 'projectName',
    type: 'text',
    message: 'Project name:',
    initial: defaultProjectName,
  },
]
