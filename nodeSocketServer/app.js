var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (req, res) {
  console.log('Received request for ' + req.url);
  res.writeHead(404);
  res.end();
});

server.listen(8000, function () {
  console.log('Server is listening on port 8000');
});

var wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

wsServer.on('request', function (request) {
  var connection = request.accept('test-echo', request.origin);
  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
      connection.sendUTF('전송완료');
    }
    else if (message.type === 'binary') {
      connection.sendBytes(message.binaryData);
    }

    connection.on('close', function (reasonCode, description) {
      console.log('Peer ' + connection.remoteAddress + ' disconnected.');
    });
  });
});