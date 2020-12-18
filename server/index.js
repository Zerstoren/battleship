const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const userPool = [];
const userPair = {};
const lobbys = {};

io.on('connection', (client) => {
  userPool.push(client);
  client.on('disconnect', () => userPool.push(client));

  client.on('message', (path, data) => {
    if (path === 'newLobby') {
      lobbys[client.conn.id] = data;
      resendLobbyListForAll();
    } 

    if (path === 'unPubLobby') {
      delete lobbys[client.conn.id];
      resendLobbyListForAll();
    } 

    if (path === 'lobbyList') {
      client.send('lobbyList', lobbys);
    }
  });
});

const resendLobbyListForAll = () => {
  userPool.forEach((client) => {
    client.send('lobbyList', lobbys);
  });
}

server.listen(8080);