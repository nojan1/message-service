module.exports = {
  routes: [
    {
      // Path defined with a URL parameter
      method: "GET",
      path: "/messages/motd",
      handler: "api::message.message.motd",
    },
  ],
};
