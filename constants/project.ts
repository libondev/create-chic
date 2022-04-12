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
