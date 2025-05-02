module.exports = function (RED) {
  function MobileXHeader(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", function (msg, send, done) {
      const flow = node.context().flow;
      const page = flow.get("page");

      console.log(`HEADER ${JSON.stringify(page)}`);
      const header = {
        template: config.template,
        background: config.background,
        color: config.color,
        logo: config.logo,
        item: {
          details: [],
          actions: [],
          actionDefault: null,
        },
      };
      page.pageHeader = header;
      console.log("numbeer Header", msg.expectNumberCountsOutput);
      msg.payload = page;
      console.log(`HEADER After ${JSON.stringify(page)}`);
      msg.topic = "pageHeader";
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-header", MobileXHeader);
};
