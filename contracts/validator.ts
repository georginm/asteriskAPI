declare module '@ioc:Adonis/Core/Validator' {
  import { Rule } from '@ioc:Adonis/Core/Validator'

  export interface Rules {
    ipList(): Rule
    codecExists(): Rule
    callGroupExists(): Rule
    uniquePerRelated(options?: {
      table: string
      column: string
      relatedColumn: string
    }): Rule
  }
}
