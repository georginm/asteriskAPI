import { ResponseContract } from '@ioc:Adonis/Core/Response'

export const success = (
  response: ResponseContract,
  data: object
): void => {
  response.status(200).send(data)
}

export const created = (
  response: ResponseContract,
  data: object
): void => {
  response.status(201).send(data)
}

export const badRequest = (
  response: ResponseContract,
  data: string
): void => {
  response.status(400).send({ message: data })
}

export const notFound = (response: ResponseContract): void => {
  response.status(404).send({ message: 'Page not fouund' })
}
