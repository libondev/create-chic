import type { Answers } from 'prompts'
// import {
//   defaultProjectName,
//   emptyCurrentDirectory,
//   isValidPackageName,
//   toValidPackageName,
// } from './index'

export function projectGenerator(cwd: string, args: Answers<string>) {
  // eslint-disable-next-line no-console
  console.log(cwd, args)
}

export function pluginsGenerator(cwd: string, args: Answers<string>) {
  // eslint-disable-next-line no-console
  console.log(cwd, args)
}
