const { buildTargetPath } = require("../../util/join_helper");

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
      HistoryList: null,
      fileList: null,
      simpleList: null,
    };

    node.on("input", function (msg) {
      let flow = this.context().flow;
      let temTab = flow.get("tab");
      const page = flow.get("page");

      let path;

      if (temTab) {
        page.pageContent.contentList.push(node.pageContent);
        msg.index_content = page.pageContent.contentList.length - 1;
        path = "pageContent.contentList";
        msg.path = buildTargetPath(path, [0]);
      } else {
        page.pageContent = node.pageContent;
        path = "pageContent";
        msg.path = buildTargetPath(path, []);
      }

      msg.payload = node.pageContent;
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-content", MobilexContentNode);
};
