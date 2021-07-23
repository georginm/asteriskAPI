import { validator } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

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
      /**
       * Se um dos campos informado do array n for valido
       * o counter é incrementado.Realizando essa verificação,
       * se pelo menos um codec inválido for passado o validator proíbe.
       * Se a verificação fosse feita da forma inversa - como estava
       * antes - if(codec.includes...)
       * Se houvesse pelo menos um codec válido, e o restante inválido
       * o validator iria deixar passar.
       */
      if (!codecs.includes(field)) {
        counter++
      }
    }

    // Se o counter for > 0, um erro é reportado.
    if (counter) {
      errorReporter.report(
        pointer,
        'codecExists',
        'invalid codec was provided',
        arrayExpressionPointer
      )
    }
  }
)

validator.rule(
  'callGroupExists',
  (value, _, { pointer, arrayExpressionPointer, errorReporter }) => {
    if (typeof value !== 'string') {
      return
    }
    var groups: string[] = []

    for (var i = 0; i < 64; i++) {
      groups[i] = `${i}`
    }

    const fields = value.split(',')
    var counter = 0

    for (const field of fields) {
      if (!groups.includes(field)) {
        counter++
      }
    }

    if (counter) {
      errorReporter.report(
        pointer,
        'callGroupExists',
        'invalid callgroup was provided',
        arrayExpressionPointer
      )
    }
  }
)

validator.rule(
  'uniquePerRelated',
  async (
    value,
    [{ table, column, relatedColumn, secondRelatedColumn }],
    { pointer, arrayExpressionPointer, errorReporter, tip }
  ) => {
    if (typeof value === 'string') return
    if (typeof pointer !== 'string') return
    if (!tip[relatedColumn]) return
    if (!tip[secondRelatedColumn]) return

    const result = await Database.from(table)
      .where(relatedColumn, tip[relatedColumn])
      .where(secondRelatedColumn, tip[secondRelatedColumn])
      .where(column, value)

    if (result.length > 0) {
      errorReporter.report(
        pointer,
        'uniquePerRelated',
        'The fields must be unique in related.',
        arrayExpressionPointer
      )
    }
  },
  () => {
    return {
      async: true,
    }
  }
)
