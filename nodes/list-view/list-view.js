const mustache = require('mustache');

module.exports = function (RED) {
  function MobileXListView(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', function (msg) {
      const items = msg.payload || [];

      const sectionItems = items.map(item => ({
        type: "html",
        title: mustache.render(config.itemTitleField, item),
        value: mustache.render(config.itemDetailField, item)
      }));

      const output = {
        pageNavigation: {
          title: mustache.render(config.headerTitle, msg),
          background: config.headerBackground
        },
        pageHeader: {
          template: config.headerTemplate,
          background: config.headerBackground,
          color: config.headerColor,
          item: {
            details: [
              {
                order: 0,
                value: mustache.render(config.headerTitle, msg)
              }
            ]
          }
        },
        pageContent: {
          template: config.template,
          background: config.sectionBackground,
          sectionList: [
            {
              title: config.sectionTitle,
              background: config.sectionBackground,
              color: config.sectionColor,
              sections: sectionItems
            }
          ]
        }
      };

      msg.payload = output;
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-list-view", MobileXListView);
};
