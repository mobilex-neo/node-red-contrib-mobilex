const mustache = require("mustache");

module.exports = function (RED) {
  function MobilexItemNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      const flow = this.context().flow;
      // console.log(
      //   `Valor do page no item List ${JSON.stringify(flow.get("page"))}`,
      // );
      // console.log(`Valor do node input ItemList ${JSON.stringify(msg.input)}`);
      let item = {
        publishLevel: parseInt(config.publishLevel) || 1,
        permissionLevel: parseInt(config.permissionLevel) || 1,
        background: mustache.render(config.background || "#FFF", msg.input),
        color: mustache.render(config.color || "#FFF", msg.input),
        details: [],
        actionDefault: parseInt(config.actionDefault) || 0,
        actions: [],
      };
      msg.topic = "itemList";
      let page = flow.get("page");
      page.pageContent.groupList.itemList.push(item);
      msg.index = page.pageContent.groupList.itemList.length - 1;
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-item-list", MobilexItemNode);
};
