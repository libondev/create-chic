export type OperatingType = 'project' | 'plugins'

export interface ProjectOptionsType {
  directory: string
  overwrite: boolean
}

export interface GeneratorOptionsType {
  cwd: string
  directory: string
}
