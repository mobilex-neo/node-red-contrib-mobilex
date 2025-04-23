const mustache = require("mustache");

module.exports = function (RED) {
  function MobilexActionNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      let action = {
        order: parseInt(config.order) || 0,
        name: mustache.render(config.name || "", msg.input),
        publishLevel: parseInt(config.publishLevel) || 1,
        permissionLevel: parseInt(config.permissionLevel) || 1,
        title: mustache.render(config.title || "", msg.input),
        icon: mustache.render(config.icon || "", msg.input),
        path: mustache.render(config.path || "", msg.input),
        parameters: [],
      };

      const flow = node.context().flow;
      const page = flow.get("page");
      const index_content = msg.index_content;
      const temTab = flow.get("tab");
      const index = msg.index;
      const index_host = msg.host;

      switch (msg.topic) {
        case "itemList":
          if (temTab) {
            page.pageContent.contentList[index_content].groupList[
              index_host
            ].itemList[index].actions?.push(action);
          } else {
            page.pageContent.groupList[index_host].itemList[
              index
            ].actions?.push(action);
          }
          break;
        case "pageHeader":
          page.pageHeader.item.actions?.push(action);
        case "groupList":
          page.pageContent.groupList.actions?.push(action);
        case "sectionList":
          page.pageContent.sectionList[index].actions.push(action);
        case "section":
          page.pageContent.sectionList[index].actions.push(action);
        case "historyList":
          page.pageContent.HistoryList[index].actions?.push(action);
        case "pageFooter":
          page.pageFooter.actions.push(action);
      }
      node.send(msg);
    });
  }
  RED.nodes.registerType("mobilex-action", MobilexActionNode);
};
