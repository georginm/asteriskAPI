export const status = async (response, error) => {
  if (error.status === 400) {
    return response.badRequest({ message: error.message })
  }
  return response.internalServerError(error)
}
