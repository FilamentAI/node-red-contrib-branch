module.exports = function (RED) {
    function BranchNode(config) {
        RED.nodes.createNode(this, config);
        this.outputs = config.outputs;
        var node = this;
        node.on('input', function (msg) {
            var toSend = [];
            msg.parts = { 
                id : msg._msgid,
                count : parseInt(node.outputs), 
                timeout : config.timeout || 0,
                unique : config.unique
            };
            for ( var i = 0; i < node.outputs; i++ ) { 
                var newObject = JSON.parse(JSON.stringify(msg));
                newObject.parts.index = i;
                toSend.push ( newObject );
            }
            node.send(toSend);
        });
    }
    RED.nodes.registerType("branch", BranchNode);
}
