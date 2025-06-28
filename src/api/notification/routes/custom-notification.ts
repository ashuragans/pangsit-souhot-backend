export default {
  routes: [
    {
      method: 'GET',
      path: '/notifications/:id/send',
      handler: 'notification.send',
      // --- THIS IS THE CRITICAL FIX ---
      // This line tells Strapi that this route does not require a login.
      config: {
        auth: false,
      },
    },
  ],
};