import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { badRequest, created, success } from 'App/Helpers/http-helper'
import Endpoint from 'App/Models/Endpoint'
// import { errorHandle } from 'App/utils/errorHandle'
import CreateEndpoint from 'App/Validators/CreateEndpointValidator'

// const fields = {
//   id: 'nome',
//   transport: 'transporte',
//   dissallow: 'desabilitar',
//   allow: 'habilitar',
//   aors: 'aors',
//   auth: 'autenticação',
//   macAddress: 'endereço mac',
//   deny: 'proibir ip',
//   permit: 'permitir ip',
//   contactDeny: 'proibir contato',
//   contactPermit: 'permitir contato',
//   callGroup: 'grupo de chamada',
//   pickupGroup: 'grupo de coleta',
//   namedCallGroup: 'nome do grupo de chamada',
//   namedPickupGroup: 'nome do grupo de coleta',
//   callerId: 'id de chamada',
//   outboundAuth: 'autenticação de saída',
//   outboundProxy: 'proxy de saída',
//   rewriteContact: 'reescrever contato',
//   rtpSymmetric: 'rtp symmetrico',
//   forceRPort: 'forçar porta R',
//   directMedia: 'mídia direta',
//   disableDirectMediaOnNat: 'desabilitar mídia direta em nat',
//   iceSupport: 'suporte de gelo',
//   allowOverlap: 'permitir sobreposição',
//   rtpTimeOut: 'tempo esgotado rtp',
//   rtpTimeOutHold: 'tempo de espera rtp',
//   rtpKeepAlive: 'manter rtp ativo',
//   timersSessExpires: 'tempo de expiração de sessão',
//   deviceStateBusyAt: 'estado do dispositivo ocupado em',
//   dtmfMode: 'modo dtmf',
// }

export default class EndpointsController {
  public async index({ response }: HttpContextContract) {
    const data = await Endpoint.all()
    return success(response, data)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const validator = await request.validate(CreateEndpoint)
      const data = await Endpoint.create(validator)

      return created(response, data)
    } catch (error) {
      return badRequest(response, error.messages.errors)
      // return badRequest(response, errorHandle(error.messages.errors, fields))
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()

    // console.log(`Update Controller - ID Exists? id: ${id}`)

    const data = await Endpoint.findBy('id', id)

    // console.log(`Data: ${data}`)

    if (!data) {
      return badRequest(response, 'Endpoint Not Exists')
    }

    data.merge(request.body())

    await data.save()

    return success(response, data)
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { id } = request.params()

    const data = await Endpoint.find(id)

    if (!data) {
      return badRequest(response, 'Endpoint Not Exists')
    }

    await data.delete()

    return success(response, {
      message: 'Endpoint Has Been Deleted',
    })
  }

  public async list({ request, response }: HttpContextContract) {
    const where = request.qs()

    const data = await Endpoint.query().where(where).orderBy('id')

    if (!data.length) {
      return badRequest(response, 'Endpoints Not Exists')
    }

    return success(response, data)
  }
}
