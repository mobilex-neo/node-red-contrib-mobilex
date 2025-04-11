module.exports = function (RED) {
  function MobilexContentNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;

    node.pageContent = {
      background: config.background || "#ffffff",
      totalPages: config.totalPages || 1,
      currentPage: config.currentPage || 1,
      hasGroupBy: config.hasGroupBy || false,
      title: config.title || "Aba 1",
      groupList: null,
      sectionList: null,
      historyList: null,
      fileList: null,
      simpleList: null,
    };

    node.on("input", function (msg) {
      let flow = this.context().flow;
      let temTab = flow.get("tab");

      if (temTab) {
        msg.payload.pageContent.contentList.push(node.pageContent);
      } else {
        msg.payload.pageContent = node.pageContent;
      }

      msg.payload = node.pageContent;
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-content", MobilexContentNode);
};
