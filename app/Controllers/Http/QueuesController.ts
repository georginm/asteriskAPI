import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import {
  badRequest,
  created,
  success,
} from 'App/Helpers/http-helper';
import Queue from 'App/Models/Queue';
import { DateTime } from 'luxon';

export default class QueuesController {
  public async index({ response }: HttpContextContract) {
    const data = await Queue.query().whereNull('deleted_at');

    if (!data) {
      return badRequest(response, 'There are not Queues');
    }

    return success(response, data);
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.body();

    const dataExists = await Queue.find(name);

    if (dataExists) {
      return badRequest(response, 'Queue Already Exists');
    }

    const data = await Queue.create(request.body());

    return created(response, data);
  }

  public async update({ request, response }: HttpContextContract) {
    const { name } = request.params();

    const data = await Queue.find(name);

    if (!data) {
      return badRequest(response, 'Queue Not Exists');
    }
    // If the body has name, the current queue is disabled and another
    // one is generated with the given name
    const nameBody = request.body().name;

    if (!nameBody) {
      await data.merge(request.body());
      await data.save();
      return success(response, data);
    }

    const newNameExists = await Queue.find(nameBody);

    if (!newNameExists) {
      await data.merge({ deletedAt: DateTime.now() }).save();
      const newData = await Queue.create(request.body());

      return success(response, newData);
    }

    return badRequest(response, 'Queue Already Exists');
  }

  public async softdelete({
    request,
    response,
  }: HttpContextContract) {
    const { name } = request.params();
    const data = await Queue.find(name);

    if (!data) {
      return badRequest(response, 'Queue Not Exists');
    }

    await data.merge({ deletedAt: DateTime.now() }).save();

    return success(response, { message: 'Queue Has Been Deleted' });
  }

  public async destroy({ request, response }: HttpContextContract) {
    const { name } = request.params();
    const data = await Queue.find(name);

    if (!data) {
      return badRequest(response, 'Queue Not Exists');
    }

    await data.delete();

    return success(response, { message: 'Queue Has Been Deleted' });
  }

  public async list({ request, response }: HttpContextContract) {
    const { name } = request.params();
    const data = await Queue.find(name);
    if (!data) {
      return badRequest(response, 'There are not Queues');
    }

    return success(response, data);
  }

  public async listDeleted({ response }: HttpContextContract) {
    const data = await Queue.query().whereNotNull('deleted_at');

    if (!data.length) {
      return badRequest(response, 'There are not Queues');
    }

    return success(response, data);
  }

  public async activate({ request, response }: HttpContextContract) {
    const { name } = request.params();
    const data = await Queue.findBy('name', name);

    if (!data) {
      return badRequest(response, 'There are not Queues');
    }

    // @ts-ignore: Object is possibly 'null'.
    await data.merge({ deletedAt: null }).save();

    // @ts-ignore: Object is possibly 'null'.
    return success(response, data);
  }
}
