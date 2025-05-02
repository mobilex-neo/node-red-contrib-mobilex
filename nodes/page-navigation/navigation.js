const nun = require("nunjucks");

module.exports = function (RED) {
  function MobilexNavigationNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg, send, done) {
      const flow = node.context().flow;
      const page = flow.get("page");
      let navigation = {
        background: config.background || "",
        color: config.color || "",
        title: nun.renderString(config.title || "", msg.input),
        left: { actions: [] },
        right: { actions: [] },
      };

      page.pageNavigation = navigation;
      msg.topic = "pageNavigation";
      msg.payload = page;
      msg.index = 0;
      msg.path = "pageNavigation";
      send(msg);
    });
  }

  RED.nodes.registerType("mobilex-navigation", MobilexNavigationNode);
};
