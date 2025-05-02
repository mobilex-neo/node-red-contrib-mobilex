const nun = require("nunjucks");
const { insertAtPath, buildTargetPath } = require("../../util/join_helper");

module.exports = function (RED) {
  function MobilexParameterNode(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    const flow = node.context().flow;

    node.on("input", function (msg) {
      const page = flow.get("page");
      const temTab = flow.get("temTab");
      const index_content = msg.index_content;
      const index = msg.index;
      const index_host = msg.host;
      const index_host_item = msg.host_item;

      try {
        let params = {};

        if (config.parameters && config.parameters.length > 0) {
          let parameters = JSON.parse(config.parameters);
          parameters.forEach((param) => {
            if (param.key && param.value) {
              params[param.key] = `${nun.renderString(param.value, msg.input)}`;
            }
          });
        }
        function objectToQueryString(obj) {
          return Object.entries(obj)
            .map(([k, v]) => `${k}=${v}`)
            .join("&");
        }

        let stringFormatada;

        if (config.title == "querystring") {
          stringFormatada = `?${objectToQueryString(params)}`;
        } else {
          stringFormatada = objectToQueryString(params);
        }

        let objReturn = {
          title: config.title,
          value: stringFormatada,
        };

        try {
          msg.path = buildTargetPath(msg.path, ["parameters"]);
          insertAtPath(page, msg.path, objReturn);
        } catch (e) {
          console.log(`ERROR ${e}`);
        }

        // if (temTab) {
        //   page.contentList[index_content].groupList[index_host].itemsList[
        //     index_host_item
        //   ].actions[index].push(objReturn);
        // } else {
        //   page.groupList[index_host].it;
        // }
        msg.payload = page;
        node.send(msg);
      } catch (err) {
        node.error("Erro ao processar os parâmetros", err);
      }
    });
  }

  RED.nodes.registerType("mobilex-parameter", MobilexParameterNode);
};
