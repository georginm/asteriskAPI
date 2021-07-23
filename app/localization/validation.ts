export default {
  'required': 'O campo {{ field }} é obrigatório.',
  'string': 'O campo {{ field }} deve ser de texto.',
  'boolean': 'O campo {{ field }} deve ser boolean.',
  'number': 'O campo {{ field }} deve ser numérico.',
  'date.format': 'O campo {{ field }} deve ser data.',
  'regex': 'O campo {{ field }} não corresponde com o padrão aceito.',
  'enum': "O campo {{ field }} deve ser '{{ options.choices }}'.",
  'object': 'O campo {{ field }} deve ser um json.',
  'exists': 'O registro de {{ field }} não existe.',
  'range':
    'O campo {{ field }} deve ser entre {{ options.start }} e {{ options.stop }}.',
  'unique': 'O campo {{ field }} deve ser único.',
  'maxLength':
    'O campo {{ field }} deve ser de no máximo {{ options.maxLength }} caracteres.',
  'minLength':
    'O campo {{ field }} deve ser de no mínimo {{ options.minLength }} caracteres.',
  'array': 'Array {{ field }} mal formatado',
  'ipList': 'Um dos parâmetros informados no campo {{ field }} é invalido',
  'codecExists': 'O campo {{ field }} deve conter um codec válido.',
  'callGroupExists': 'O campo {{ field }} deve conter um grupo válido.',
  'uniquePerRelated': 'O campo {{ field }} deve ser único no relacionamento.',
}
