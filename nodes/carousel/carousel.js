const mustache = require('mustache');

module.exports = function (RED) {
  function MobileXCarousel(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on('input', function (msg) {
      const items = msg.payload || [];

      const itemList = items.map(item => ({
        background: mustache.render(config.backgroundField, item),
        color: config.itemColor,
        details: [
          {
            order: 0,
            value: mustache.render(config.textField, item)
          }
        ]
      }));

      const output = {
        pageNavigation: {
          title: mustache.render(config.title, msg),
          background: config.navBackground
        },
        pageContent: {
          template: config.carouselTemplate,
          background: config.carouselBackground,
          groupList: [
            {
              template: config.carouselTemplate,
              background: config.carouselBackground,
              color: config.itemColor,
              itemsList: itemList
            }
          ]
        }
      };

      msg.payload = output;
      node.send(msg);
    });
  }

  RED.nodes.registerType("mobilex-carousel", MobileXCarousel);
};
