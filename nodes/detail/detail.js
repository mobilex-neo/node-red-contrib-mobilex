const nun = require("nunjucks");

module.exports = function (RED) {
  function MobilexDetailNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    let valor = 0;

    node.on("input", function (msg, send, done) {
      const flow = node.context().flow;
      const page = flow.get("page");
      const temTab = flow.get("tab");

      const detail = {
        order: parseInt(config.order) || 0,
        value: nun.renderString(config.value || "", msg.input),
      };

      if (msg.topic === "pageHeader") {
        page.pageHeader.item.details.push(detail);
      } else if (msg.topic === "itemsList") {
        if (temTab) {
          page.pageContent.contentList[msg.index_content].groupList[
            msg.host
          ].itemsList[msg.index].details.push(detail);
        } else {
          page.pageContent.groupList[msg.host].itemsList[
            msg.index
          ].details.push(detail);
        }
      }
      valor++;
      console.log("valor", valor);

      send(msg);
    });
  }

  RED.nodes.registerType("mobilex-detail", MobilexDetailNode);
};
