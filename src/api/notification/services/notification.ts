import { factories } from '@strapi/strapi';
import webpush from 'web-push';

export default factories.createCoreService('api::notification.notification', ({ strapi }) => ({
  async sendPushNotifications(notification) {
    if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
      console.error("VAPID keys not found.");
      return;
    }
    webpush.setVapidDetails(
      'mailto:sternarya@gmail.com',
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );
    const subscriptions = await strapi.entityService.findMany('api::push-subscription.push-subscription');
    if (!subscriptions.length) return;
    const payload = JSON.stringify({
      title: notification.title,
      body: notification.body,
      icon: notification.icon_url,
      image: notification.image_url,
    });
    const sendPromises = subscriptions.map(sub =>
      webpush.sendNotification(sub.details, payload).catch(err => console.error(err))
    );
    await Promise.all(sendPromises);
  }
}));