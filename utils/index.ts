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

// 如果目标文件夹不存在或者内部没有文件则表示可以安全覆盖
export function canSafelyOverwrite(directory: string) {
  return !existsSync(directory) || readdirSync(directory).length === 0
}

// 下划线开头的文件转成 . 开头
export function underlineTransformToDot(path: string) {
  return path.replace(/^_|\/_/, '.')
    .replace(/\/_/g, '/.')
    .replace(/\\_/g, '\\.')
}
