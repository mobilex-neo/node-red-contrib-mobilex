const joinHelper = require("../../util/join_helper.js");

module.exports = function (RED) {
  function MobilexJoinNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    let inboundCount = 0;
    const myNodeId = node.id;
    let receivedMessagesCount = 0;
    const topics = [];

    RED.nodes.eachNode((n) => {
      if (!n.wires) return;

      // n.wires é uma array de arrays (por saída)
      for (const output of n.wires) {
        if (output.includes(myNodeId)) {
          inboundCount++;
          break;
        }
      }
    });

    node.status({
      fill: "blue",
      shape: "dot",
      text: `Aguardando ${inboundCount}`,
    });

    node.on("input", function (msg) {
      const flow = node.context().flow;
      const page = flow.get("page");
      receivedMessagesCount++;
      topics.push(msg.topic);

      node.status({
        fill: "yellow",
        shape: "ring",
        text: `Recebidos ${receivedMessagesCount}/${inboundCount} - ${topics}`,
      });

      if (receivedMessagesCount >= inboundCount) {
        msg.payload = page;
        node.status({ fill: "green", shape: "dot", text: "Completo" });
        node.send(msg);
        receivedMessagesCount = 0;

        setTimeout(() => {
          node.status({
            fill: "blue",
            shape: "dot",
            text: `Aguardando ${inboundCount}`,
          });
        }, 1000);
      }
    });

    node.on("close", function () {
      console.log("Close Join");
      joinHelper.clearAll();
    });
  }

  RED.nodes.registerType("mobilex-join", MobilexJoinNode);
};
