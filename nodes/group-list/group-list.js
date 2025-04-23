const mustache = require("mustache");

module.exports = function (RED) {
  function MobilexTemplateNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      const flow = node.context().flow;
      try {
        let node_input = msg.input;
        let templateData = {
          template: mustache.render(config.template, node_input),
          title: mustache.render(config.title, node_input),
          background: mustache.render(config.background, node_input),
          color: mustache.render(config.color, node_input),
          actions: [],
          itemList: [],
        };

        const temTab = flow.get("tab");
        const page = flow.get("page");
        const index = msg.index_content;

        if (temTab) {
          page.pageContent.contentList[index].groupList = [templateData];
          msg.index = page.pageContent.contentList[index].groupList.length - 1;
        } else {
          page.pageContent.groupList = [templateData];
          msg.index = page.pageContent.groupList.length - 1;
        }
        msg.topic = "groupList";
        msg.expectNumberCountsOutput = node.wires[0].length;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao processar o template", err);
      }
    });
  }

  RED.nodes.registerType("mobilex-group-list", MobilexTemplateNode);
};
