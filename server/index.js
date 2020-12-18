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
  client.on('disconnect', () => processDisconnect(client));

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

    if (path === 'connectLobby') {
      connectUsersPair(client, client.conn.id, data);
    }
  });
});

const findClientById = (clientId) => userPool.find((client) => {
  return client.conn.id === clientId;
});

const connectUsersPair = (client, clientId, targetId) => {
  if (!lobbys[targetId]) {
    client.send('opponentDisconnect');
    return;
  }
  const targetClient = findClientById(targetId);

  if (!targetClient) {
    client.send('opponentDisconnect');
    return;
  }

  userPair[clientId] = targetId;
  userPair[targetId] = clientId;
  delete lobbys[targetId];

  client.send('gamePrepare');
  targetClient.send('ganePrepare');
  resendLobbyListForAll();
};

const processDisconnect = (client) => {
  const connId = client.conn.id;
  if (userPair[connId]) {
    const targetId = userPair[connId];
    delete userPair[targetId];
    delete userPair[connId];
    findClientById(targetId).send('opponentDisconnect');
  }

  userPool.slice(userPool.indexOf(client), 1);

  if (lobbys[connId]) {
    delete lobbys[connId];
    resendLobbyListForAll();
  }
};

const resendLobbyListForAll = () => {
  userPool.forEach((client) => {
    client.send('lobbyList', lobbys);
  });
}

server.listen(8080);