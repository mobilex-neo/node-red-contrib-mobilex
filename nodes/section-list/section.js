const { buildTargetPath, insertAtPath } = require("../../util/join_helper");

module.exports = function (RED) {
  function MobilexSectionListNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    const buffer = new Map();

    node.on("input", function (msg) {
      const flow = node.context().flow;
      const page = flow.get("page");
      const temTab = flow.get("tab");
      const index_content = msg.index;

      const sectionList = {
        template: config.template || "A",
        title: config.title || "Título da seção",
        background: config.background || "#A11480",
        color: config.color || "#FFF",
        actionDefault: config.actionDefault || 0,
        actions: [],
        sections: [],
      };

      if (temTab) {
        page.pageContent.contentList[index_content].sectionList = [];
        msg.path = buildTargetPath(msg.path, ["sectionList"]);
        insertAtPath(page, msg.path, sectionList);
        msg.index =
          page.pageContent.contentList[index_content].sectionList.length - 1;
      } else {
        page.pageContent.sectionList = [];
        msg.path = buildTargetPath(msg.path, ["sectionList"]);
        insertAtPath(page, msg.path, sectionList);
        msg.index = page.pageContent.sectionList.length - 1;
      }

      msg.topic = "sectionList";
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-sectionList", MobilexSectionListNode);
};
