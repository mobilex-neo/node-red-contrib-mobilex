const nun = require("nunjucks");
const { buildTargetPath } = require("../../util/join_helper");

module.exports = function (RED) {
  function MobilexTemplateNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;
    // node.outputs = config.outputs;

    node.on("input", function (msg, send, done) {
      const flow = node.context().flow;
      try {
        let node_input = msg.payload;
        let templateData = {
          template: nun.renderString(config.template, node_input),
          title: nun.renderString(config.title, node_input),
          background: nun.renderString(config.background, node_input),
          color: nun.renderString(config.color, node_input),
          actions: [],
          itemsList: [],
        };

        const temTab = flow.get("tab");
        const page = flow.get("page");
        const index = msg.index;

        if (temTab) {
          page.pageContent.contentList[index].groupList = [templateData];
          msg.index = page.pageContent.contentList[index].groupList.length - 1;
        } else {
          if (page.pageContent.groupList === null) {
            page.pageContent.groupList = [];
          }
          page.pageContent.groupList.push(templateData);
          msg.index = page.pageContent.groupList.length - 1;
        }
        msg.topic = "groupList";
        msg.path = buildTargetPath(msg.path, ["groupList", msg.index]);
        send(msg);
      } catch (err) {
        node.error("Erro ao processar o template", err);
      }
    });
  }

  RED.nodes.registerType("mobilex-group-list", MobilexTemplateNode);
};
