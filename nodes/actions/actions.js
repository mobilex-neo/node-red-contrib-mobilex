module.exports = function (RED) {
  function MobilexActionNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      console.log(`topic ${msg.topic}`);
      console.log(
        `Aqui esta Actions Item List ${JSON.stringify(msg.payload.pageContent.groupList.itemList[0].actions)}`,
      );
      console.log(`Aqui esta ${JSON.stringify(config)}`);
      let action = {
        order: parseInt(config.order) || 0,
        name: config.name || "",
        publishLevel: parseInt(config.publishLevel) || 1,
        permissionLevel: parseInt(config.permissionLevel) || 1,
        title: config.title || "",
        icon: config.icon || "",
        path: config.path || "",
        parameters: config.parameters ? JSON.parse(config.parameters) : [],
      };
      if (msg.topic == "itemList") {
        msg.payload.pageContent.groupList.itemList[0].actions.push(action);
      }
      msg.topic = "action";
      node.send(msg);
    });
  }
  RED.nodes.registerType("mobilex-action", MobilexActionNode);
};
