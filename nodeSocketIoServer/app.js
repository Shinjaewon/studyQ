var io = require('socket.io').listen(8000);
io.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
io.set('origins', '*:*');
io.sockets.on('connection', function (socket) {
  socket.emit('example message 1', { hello: 'world 1' });

  socket.on('example message 2', function (data) {
    console.log(data);
  });
});