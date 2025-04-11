module.exports = function (RED) {
  function MobilexPageNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
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
      msg.payload = obj;
      console.log("asdckjasdkj");
      console.log(obj);
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-page", MobilexPageNode);
};
