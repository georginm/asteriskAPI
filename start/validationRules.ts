/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { validator } from '@ioc:Adonis/Core/Validator'

const regexp =
  /^((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5]))(\/((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5])))?(,(((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5]))(\/((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5])))?)){0,5}$/

validator.rule(
  'ipList',
  (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    if (typeof value !== 'string') {
      return
    }

    const result = regexp.test(value)

    if (!result) {
      errorReporter.report(
        pointer,
        'ipList',
        'invalid ip was provided',
        arrayExpressionPointer
      )
    }
  }
)
