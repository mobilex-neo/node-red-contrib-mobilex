const mustache = require("mustache");

module.exports = function (RED) {
  function MobileXHeader(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    const buffer = new Map();

    node.on("input", function (msg, send, done) {
      const groupID = msg.groupId;
      const flow = node.context().flow;

      const expectNumberCountsInputs = msg.expectNumberCountsOutput;

      if (!buffer.has(groupID)) {
        buffer.set(groupID, { expectNumberCountsInputs, count: 0 });
      }

      const group = buffer.get(groupID);
      group.count++;

      if (group.count >= group.expectNumberCountsInputs) {
        console.log(`chegou o envio ${group.count}`);
        let page = flow.get("page");
        const header = {
          template: config.template,
          background: config.background,
          color: config.color,
          item: {
            details: [],
            actions: [],
            actionDefault: null,
          },
        };
        msg.payload = page;
        msg.topic = "pageHeader";
        page.pageHeader = header;
        buffer.delete(groupID);
        node.send(msg);
      }
    });
  }

  RED.nodes.registerType("mobilex-header", MobileXHeader);
};
