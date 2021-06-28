import { ResponseContract } from '@ioc:Adonis/Core/Response'

export const success = (response: ResponseContract, data: object, statusCode = 200): void => {
  response.status(statusCode).send(data)
}

export const successCreated = (
  response: ResponseContract,
  data: object,
  statusCode = 201
): void => {
  response.status(statusCode).send(data)
}

export const badRequest = (response: ResponseContract, data: object, statusCode = 400): void => {
  response.status(statusCode).send(data)
}

export const notFound = (response: ResponseContract, data: object, statusCode = 404): void => {
  response.status(statusCode).send(data)
}
