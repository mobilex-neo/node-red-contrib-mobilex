const Page = require("../../lib/page.js");

module.exports = function (RED) {
  function MobilexTemplateNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      // console.log(`to aqui ${JSON.stringify(msg.payload)}`);
      try {
        let templateData = {
          template: config.template || "A",
          title: config.title || "Grupo ABC",
          background: config.background || "#A11480",
          color: config.color || "#FFF",
          actions: [],
          itemList: [],
        };

        const flow = node.context().flow;
        const temTab = flow.get("tab");

        if (temTab) {
          msg.payload.pageContent.contentList.push({
            groupList: templateData,
          });
        } else {
          msg.payload.pageContent = {
            groupList: templateData,
          };
        }
        // console.log(`to aqui ${JSON.stringify(msg.payload)}`);
        // const pageResult = new Page("pageGroupList", templateData);
        msg.topic = "groupList";
        node.send(msg);
      } catch (err) {
        node.error("Erro ao processar o template", err);
      }
    });
  }

  RED.nodes.registerType("mobilex-group-list", MobilexTemplateNode);
};
