export type OperatingType = 'project' | 'plugins'

export interface ProjectOptionsType {
  directory: string
  overwrite: boolean
}

export interface GeneratorOptionsType {
  cwd: string
  root: string
  directory: string
  overwrite?: boolean
}

export type BaseJsonType = Record<string, string>
export type PackageJsonType = Record<string, string | BaseJsonType>
