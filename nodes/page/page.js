module.exports = function (RED) {
  function MobilexPageNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      let input_node = msg.payload;
      let flow = this.context().flow;
      flow.set("tab", config.tab);
      const obj = config.componentes.reduce((acc, key) => {
        if (config.tab && key === "pageContent") {
          acc[key] = {
            contentList: [],
          };
        } else {
          acc[key] = {};
        }
        return acc;
      }, {});
      msg.topic = "page";
      flow.set("page", obj);
      msg.payload = input_node;
      msg.input = input_node;
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-page", MobilexPageNode);
};
