const mustache = require("mustache");

module.exports = function (RED) {
  function MobilexDetailNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      const flow = node.context().flow;
      const node_input = msg.input;
      let page = flow.get("page");

      try {
        let detail = {
          order: parseInt(config.order) || 0,
          value: mustache.render(config.value || "", node_input),
        };

        if (msg.topic == "pageHeader") {
          page.pageHeader.item.details.push(detail);
        }

        msg.payload = page;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao processar o detalhe", err);
      }
    });
  }

  RED.nodes.registerType("mobilex-detail", MobilexDetailNode);
};
