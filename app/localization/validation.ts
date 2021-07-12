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
  'uniquePerRelated': 'O campo {{ field }} deve ser único no relacionamento.',
  'permissionType': 'O campo {{ field }} deve ser do tipo adequado.',
  'parentHasPermission': 'O grupo de permissão pai não tem estas permissões.',
  'parentHasPermissionGroup':
    'O líder imediato não tem estes grupos de permissões.',
  'maxLength':
    'O campo {{ field }} deve ser de no máximo {{ options.maxLength }} caracteres.',
  'minLength':
    'O campo {{ field }} deve ser de no mínimo {{ options.minLength }} caracteres.',
  'array': 'Array {{ field }} mal formatado',
}
