module.exports = function (RED) {
	function MobileXForm(config) {
	  RED.nodes.createNode(this, config);
	  const node = this;
  
	  node.on('input', function (msg) {
		const form = {
		  pageContent: {
			simpleList: [
			  {
				id: "1",
				text: "Nome",
				value: "",
				checked: false
			  },
			  {
				id: "2",
				text: "E-mail",
				value: "",
				checked: false
			  }
			]
		  }
		};
  
		msg.payload = msg.payload || form;
		node.send(msg);
	  });
	}
  
	RED.nodes.registerType("mobilex-form", MobileXForm);
  };
  