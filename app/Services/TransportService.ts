import InternalServerErrorException from 'App/Exceptions/InternalServerErrorException'
import TransportRepository from 'App/Repositories/TransportRepository'
import { destroy, exists, unique } from 'App/utils/database'

export default class TransportService {
  public async create(data): Promise<TransportRepository> {
    unique(TransportRepository.table, 'id', data.id, 'id')

    try {
      return await TransportRepository.create(data)
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }
}
