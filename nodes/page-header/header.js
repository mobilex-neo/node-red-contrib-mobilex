const mustache = require("mustache");

module.exports = function (RED) {
  function MobileXHeader(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", function (msg) {
      const header = {
        template: config.template,
        background: config.background,
        color: config.color,
        item: {
          details: [{ order: 0, value: mustache.render(config.text, msg) }],
        },
      };
      msg.payload.pageHeader = header;
      msg.topic = "pageHeader";
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-header", MobileXHeader);
};
