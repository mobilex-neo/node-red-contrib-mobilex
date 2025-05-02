const nun = require("nunjucks");
const { buildTargetPath } = require("../../util/join_helper");

module.exports = function (RED) {
  function MobilexItemNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      const flow = this.context().flow;
      msg.host = msg.index;
      let item = {
        publishLevel: parseInt(config.publishLevel) || 1,
        permissionLevel: parseInt(config.permissionLevel) || 1,
        background: nun.renderString(config.background || "#FFF", msg.input),
        color: nun.renderString(config.color || "#FFF", msg.input),
        details: [],
        actionDefault: parseInt(config.actionDefault) || 0,
        actions: [],
      };

      let page = flow.get("page");
      let temTab = flow.get("tab");
      let index_content = msg.index_content;

      if (temTab) {
        page.pageContent.contentList[index_content].groupList[
          msg.index
        ].itemsList.push(item);

        msg.index =
          page.pageContent.contentList[index_content].groupList[msg.index]
            .itemsList.length - 1;
      } else {
        page.pageContent.groupList[msg.index].itemsList.push(item);
        msg.index = page.pageContent.groupList[msg.index].itemsList.length - 1;
      }

      msg.topic = "itemsList";
      msg.path = buildTargetPath(msg.path, ["itemsList", msg.index]);
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-item-list", MobilexItemNode);
};
