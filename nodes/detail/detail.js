const mustache = require("mustache");

module.exports = function (RED) {
  function MobilexDetailNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.on("input", function (msg) {
      const flow = node.context().flow;
      const node_input = msg.input;
      const page = flow.get("page");

      const index_content = msg.index_content;
      const temTab = flow.get("tab");
      const index = msg.index;
      const index_host = msg.host;

      try {
        const detail = {
          order: parseInt(config.order) || 0,
          value: mustache.render(config.value || "", node_input),
        };

        if (msg.topic == "pageHeader") {
          page.pageHeader.item.details.push(detail);
        } else if (msg.topic == "itemList") {
          if (temTab) {
            console.log("temTab");
            page.pageContent.contentList[index_content].groupList[
              index_host
            ].itemList[index].details.push(detail);
            console.log("PAssei");
          } else {
            page.pageContent.groupList.itemList.details.push(detail);
          }
        }

        node.send(msg);
      } catch (err) {
        node.error("Erro ao processar o detalhe", err);
      }
    });
  }

  RED.nodes.registerType("mobilex-detail", MobilexDetailNode);
};
