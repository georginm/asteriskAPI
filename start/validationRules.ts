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

validator.rule(
  'ipList',
  (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    if (typeof value !== 'string') {
      return
    }

    const regexp =
      /^((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5]))(\/((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5])))?(,(((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5]))(\/((1?\d{1,2}|2([0-4]\d|5[0-5]))\.){3}(1?\d{1,2}|2([0-4]\d|5[0-5])))?)){0,5}$/

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

validator.rule(
  'codecExists',
  (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    if (typeof value !== 'string') {
      return
    }

    const codecs = ['alaw', 'ulaw', 'all', 'gsm']

    const fields = value.split(',')

    var counter = 0

    for (const field of fields) {
      if (codecs.includes(field)) {
        counter++
      }
    }

    if (!counter) {
      errorReporter.report(
        pointer,
        'codecExists',
        'invalid codec was provided',
        arrayExpressionPointer
      )
    }
  }
)
