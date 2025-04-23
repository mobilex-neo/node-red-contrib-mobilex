const mustache = require("mustache");

module.exports = function (RED) {
  function MobilexItemNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      const flow = this.context().flow;

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
      msg.host = msg.index;

      let page = flow.get("page");
      let temTab = flow.get("tab");
      let index_content = msg.index_content;

      if (temTab) {
        page.pageContent.contentList[index_content].groupList[
          msg.index
        ].itemList.push(item);

        msg.index =
          page.pageContent.contentList[index_content].groupList[msg.index]
            .itemList.length - 1;
      } else {
        page.pageContent.groupList[msg.index].itemList.push(item);
        msg.index = page.pageContent.groupList[msg.index].itemList.length - 1;
      }
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-item-list", MobilexItemNode);
};
