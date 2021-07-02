import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {
  badRequest,
  created,
  success,
} from 'App/Helpers/http-helper';

import QueueMember from 'App/Models/QueueMember';
import Queue from 'App/Models/Queue';
import { alreadyExists, insert } from 'App/Services/DatabaseMethods';

export default class QueueMembersController {
  public async index({ response }: HttpContextContract) {
    const data = await QueueMember.query().orderBy('interface');
    return success(response, data);
  }

  public async store({ request, response }: HttpContextContract) {
    const inter = request.only(['interface']);
    const queue = request.only(['queue_name']);

    const queueAlreadyExists = await Queue.find(queue);

    if (!queueAlreadyExists) {
      return badRequest(response, 'Queue Not Found');
    }

    const dataExists = await alreadyExists('queue_members', inter);

    if (dataExists) {
      return badRequest(response, 'QueueMember Already Exists');
    }

    const data = await insert('queue_members', request.body());

    return created(response, data);
  }

  public async update({ request, response }: HttpContextContract) {
    const { inter } = request.params();

    const data = await QueueMember.find(inter);

    if (!data) {
      return badRequest(response, 'QueueMember Not Exists');
    }

    data.merge(request.body());

    await data.save();

    return success(response, data);
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { protocol, endpoint } = request.params();

    const data = await QueueMember.findBy(
      'interface',
      `${protocol + '/' + endpoint}`
    );

    // const dataExists = await alreadyExists('queue_members', inter)
    if (!data) {
      return badRequest(response, 'QueueMember Not Exists');
    }

    // console.log(data.$attributes)
    await QueueMember.query().where(data.$attributes).delete();

    return success(response, {
      message: 'QueueMember Has Been Deleted',
    });
  }

  public async list({ request, response }: HttpContextContract) {
    const { protocol, endpoint } = request.params();

    const data = await QueueMember.findBy(
      'interface',
      `${protocol + '/' + endpoint}`
    );
    if (!data) {
      return badRequest(response, 'QueueMember Not Exists');
    }

    return success(response, data);
  }
}
