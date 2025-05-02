const nun = require("nunjucks");
const { buildTargetPath } = require("../../util/join_helper");

module.exports = function (RED) {
  function MobilexActionNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg, send, done) {
      let action = {
        order: parseInt(config.order) || 0,
        name: nun.renderString(config.name || "", msg.input),
        publishLevel: parseInt(config.publishLevel) || 1,
        permissionLevel: parseInt(config.permissionLevel) || 1,
        title: nun.renderString(config.title || "", msg.input),
        icon: nun.renderString(config.icon || "", msg.input),
        path: nun.renderString(config.path || "", msg.input),
        parameters: [],
      };
      console.log("ACTION ENVIO -----------------------");
      const flow = node.context().flow;
      const page = flow.get("page");
      const temTab = flow.get("tab");
      const index_content = msg.index_content;
      const index = msg.index;
      const index_host = msg.host;

      switch (msg.topic) {
        case "itemsList":
          msg.index_intem = msg.index;
          if (temTab) {
            page.pageContent.contentList[index_content].groupList[
              index_host
            ].itemsList[index].actions?.push(action);

            msg.index =
              page.pageContent.contentList[index_content].groupList[index_host]
                .itemsList[index].actions.length - 1;
          } else {
            page.pageContent.groupList[index_host].itemsList[
              index
            ].actions?.push(action);
            msg.index =
              page.pageContent.groupList[index_host].itemsList[index].actions
                .length - 1;
          }
          break;
        case "pageHeader":
          page.pageHeader.item.actions?.push(action);
          break;
        case "groupList":
          page.pageContent.groupList.actions?.push(action);
          break;
        case "sectionList":
          page.pageContent.sectionList[index].actions.push(action);
          break;
        case "section":
          page.pageContent.sectionList[index].actions.push(action);
          break;
        case "historyList":
          page.pageContent.HistoryList[index].actions?.push(action);
          break;
        case "pageFooter":
          page.pageFooter.actions.push(action);
          break;
        case "pageNavigation":
          page.pageNavigation.left.actions.push(action);
          break;
      }
      msg.topic = "Action";
      msg.path = buildTargetPath(msg.path, ["actions", msg.index]);
      send(msg);
    });
  }
  RED.nodes.registerType("mobilex-action", MobilexActionNode);
};
