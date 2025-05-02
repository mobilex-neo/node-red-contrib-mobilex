const joinHelper = require("../../util/join_helper.js");

module.exports = function (RED) {
  function MobilexJoinNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", function (msg) {
      const flow = node.context().flow;
      const page = flow.get("page");

      console.log(`Page aqui node ${JSON.stringify(node)}`);
      console.log(`Page ${JSON.stringify(page)}`);

      msg.payload = page;

      node.send(msg);
    });

    node.on("close", function () {
      console.log("Close Join");
      joinHelper.clearAll();
    });
  }

  RED.nodes.registerType("mobilex-join", MobilexJoinNode);
};
