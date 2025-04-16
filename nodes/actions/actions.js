const mustache = require("mustache");

module.exports = function (RED) {
  function MobilexActionNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.on("input", function (msg) {
      const flow = node.context().flow;
      let page = flow.get("page");
      console.log(`topic ${msg.topic}`);
      console.log(`Aqui esta Actions Item List ${JSON.stringify(page)}`);
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
      let index = msg.index;

      switch (msg.topic) {
        case "itemList":
          console.log("ola");
          page.pageContent.groupList.itemList[index].actions?.push(action);
          break;
        case "pageHeader":
          console.log("ola2");
          console.log(msg.topic);
          page.pageHeader.item.actions?.push(action);
        case "groupList":
          console.log("ola3");
          page.pageContent.groupList.actions?.push(action);
        case "sectionList":
          console.log("ola4");
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
