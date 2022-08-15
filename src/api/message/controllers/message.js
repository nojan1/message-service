"use strict";

/**
 *  message controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const parser = require("cron-parser");

module.exports = createCoreController("api::message.message", ({ strapi }) => ({
  async motd() {
    const publishedMessages = await strapi.api.message.services.message.find({
      _publicationState: "published",
    });

    // console.log(publishedMessages);

    const message = (publishedMessages?.results ?? [])
      .filter((m) => {
        if (!m.cron) return true;

        try {
          const interval = parser.parseExpression(m.cron, {
            currentDate: new Date(new Date().getTime() - 60 * 1000),
          });
          if (!interval.hasNext()) return false;

          const next = interval.next();
          const sample = new Date();
          const isValid =
            next.getFullYear() === sample.getFullYear() &&
            next.getMonth() === sample.getMonth() &&
            next.getDay() === sample.getDay() &&
            next.getHours() === sample.getHours() &&
            next.getMinutes() === sample.getMinutes();

          //   console.log(next, sample, isValid);

          return isValid;
        } catch (err) {
          console.error("Error parsing cron", err);
          return false;
        }
      })
      .reduce(
        (acc, cur) => `${acc}
${
  cur.title
    ? `# ${cur.title}
`
    : ""
}
${cur.content}
    `,
        ""
      );

    return {
      message,
    };
  },
}));
