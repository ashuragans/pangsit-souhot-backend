import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::notification.notification', ({ strapi }) => ({
  async send(ctx) {
    try {
      const { id } = ctx.params;
      const notificationToSend = await strapi.entityService.findOne('api::notification.notification', id);
      if (!notificationToSend) return ctx.notFound('Notification not found');

      await strapi.service('api::notification.notification').sendPushNotifications(notificationToSend);
      return ctx.send({ message: 'Notification sending process initiated.' });
    } catch (err) {
      ctx.body = err;
    }
  }
}));