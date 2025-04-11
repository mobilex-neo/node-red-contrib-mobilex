const PAGE = require("../../lib/page.js");

module.exports = function (RED) {
  function MobilexItemNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    // RED.hooks.add("onReceive", (receiveEvent) => {
    //   console.log(`Messageode acima: ${receiveEvent.destination.id}`);
    // });

    // RED.hooks.add("onReceive", (receiveEvent) => {
    //   console.log(`Messageode: ${receiveEvent.destination.id}`);
    // });
    // node.log(msg.payload.title);
    // node.log(msg.topic);
    // if (msg.payload.detail) {
    //   node.details.push(msg.payload.detail);
    // }
    //
    // if (msg.payload.action) {
    //   node.actions.push(msg.payload.action);
    // }
    node.on("input", function (msg) {
      console.log(`Valor elemento ${JSON.stringify(msg.payload)}`);
      let item = {
        publishLevel: parseInt(config.publishLevel) || 1,
        permissionLevel: parseInt(config.permissionLevel) || 1,
        background: config.background || "#FFF",
        color: config.color || "#FFF",
        details: [],
        actionDefault: parseInt(config.actionDefault) || 0,
        actions: [],
      };
      var flow = this.context().flow;
      flow.set("itemList", item);
      console.log(`Context ${JSON.stringify(this.context().flow)}`);
      msg.topic = "itemList";
      msg.payload.pageContent.groupList.itemList.push(item);
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-item-list", MobilexItemNode);
};
