module.exports = function (RED) {
    function BranchNode(config) {
        RED.nodes.createNode(this, config);
        this.outputs = config.outputs;
        var node = this;
        node.on('input', function (msg) {
            var toSend = [];
            msg.parts = { 
                id : msg._msgid,
                count : parseInt(node.outputs)
            };
            for ( var i = 0; i < node.outputs; i++ ) { 
                toSend.push ( msg );
            }
            node.send(toSend);
        });
    }
    RED.nodes.registerType("branch", BranchNode);
}
