module.exports = function (RED) {
  function searchArrays(obj, path = "") {
    const results = [];

    if (Array.isArray(obj)) {
      results.push({ path, length: obj.length });
    } else if (typeof obj === "object" && obj !== null) {
      for (const key in obj) {
        const newPath = path ? `${path}.${key}` : key;
        results.push(...searchArrays(obj[key], newPath));
      }
    }

    return results;
  }

  function MobilexPageNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    node.outputs = config.outputs;

    console.log("AQUI O VALOR DE RETORNO ANTES");
    node.on("close", function () {
      console.log("AQUI O VALOR DE RETORNO");
    });

    node.on("input", function (msg, send, done) {
      const input_node = msg.payload;
      const flow = this.context().flow;

      flow.set("tab", config.tab);

      const obj = config.componentes.reduce((acc, key) => {
        if (config.tab && key === "pageContent") {
          acc[key] = {
            contentList: [],
          };
        } else {
          acc[key] = {};
        }
        return acc;
      }, {});

      const arrays = searchArrays(input_node, config.path);
      let maiorLength;
      if (config.wiresTo) {
        maiorLength = Math.max(...arrays.map((item) => item.length));
      } else {
        maiorLength = 1;
      }

      flow.set("page", obj);

      msg.topic = "page";
      msg.input = input_node;
      msg.timeout = config.timeout;
      msg.wiresTo = config.wiresTo;
      msgOutput = Array.from({ length: node.outputs }, (_, index) => [msg]);
      send(msgOutput);
    });
  }

  RED.nodes.registerType("mobilex-page", MobilexPageNode);
};
