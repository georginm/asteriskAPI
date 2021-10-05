import BadRequestException from 'App/Exceptions/BadRequestException'

export const pagination = () => {
  if (!process.env.ITEMS_PER_PAGE)
    throw new BadRequestException(
      'A paginação não foi definida nas variáveis de ambiente'
    )

  return parseInt(`${process.env.ITEMS_PER_PAGE}`, 10)
}
