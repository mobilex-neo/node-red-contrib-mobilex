const nun = require("nunjucks");
const { buildTargetPath, insertAtPath } = require("../../util/join_helper");

module.exports = function (RED) {
  function SectionNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    const flow = node.context().flow;

    node.on("input", function (msg) {
      const page = flow.get("page");
      const temTab = flow.get("tab");
      const index_content = msg.index;

      const output = {
        type: nun.renderString(config.type, msg.payload),
        title: nun.renderString(config.title, msg.payload),
        value: nun.renderString(config.value, msg.payload),
        actionDefault: parseInt(config.actionDefault || 0),
        actions: [],
      };

      if (temTab) {
        msg.path = buildTargetPath(msg.path, [index_content, "sections"]);
        insertAtPath(page, msg.path, output);
        msg.index =
          page.pageContent.contentList[index_content].sectionList.length - 1;
      } else {
        page.pageContent.sectionList[index_content].push(output);
        msg.index = page.pageContent.sectionList.length - 1;
      }

      msg.topic = "section";
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-section", SectionNode);
};
