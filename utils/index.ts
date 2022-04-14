import rimraf from 'rimraf'
import { existsSync, readdirSync } from 'fs-extra'

export const defaultProjectName = 'demo-project'

const validPackageNameRule = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/u

export const isValidPackageName = (name: string) => validPackageNameRule.test(name)

export const toValidPackageName = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-')

export function canSafelyOverwrite(directory: string) {
  return !existsSync(directory) || readdirSync(directory).length === 0
}

export function underlineToDot(path: string) {
  if (path.startsWith('_')) {
    return path.replace(/^_/, '.')
  }

  return path
}

export const emptyTargetDirectory = async(directory: string) => {
  if (!existsSync(directory)) {
    return
  }

  rimraf.sync(directory)
}
