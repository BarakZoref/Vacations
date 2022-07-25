const jwt_decode = require('jwt-decode');
const express = require("express");
const expressServer = express();
const http = require("http"); 
const httpServer = http.createServer(expressServer);
const socketIO = require("socket.io")(httpServer, {
    cors: {
        origin: ['http://localhost:3000'],
    },
});
const socketServer = socketIO.listen(httpServer);

let userIdToSocketsMap = new Map();

// 2. Server got the client connection, and add its Socket to a Socket collection:
socketServer.sockets.on("connection", socket => {
    console.log("Connection request");

    let userId = getUserIdFromSocket(socket);

    console.log("User id: " + userId);
    if(userIdToSocketsMap.has(userId)){
        userIdToSocketsMap.get(userId).push(socket);
    }
    else{
        userIdToSocketsMap.set(userId, [socket]);
    }

    console.log("One client has been connected... Total clients: " + userIdToSocketsMap.size);

    // 7. When user disconnects: 
    socket.on("disconnect", () => {
        let userId = getUserIdFromSocket(socket);
        // A valid userId means the user clicked "logout"
        userIdToSocketsMap.delete(userId);

        let sockets = userIdToSocketsMap.get(userId)
        if (sockets && sockets.length > 1) {
            sockets = sockets.filter((usersSocket) => usersSocket != socket)
            userIdToSocketsMap.set(userId, sockets);
        }
        else {
            userIdToSocketsMap.delete(userId);
        }

        console.log(userId + " client has been disconnected. Total clients: " +
            userIdToSocketsMap.size);
    });

});

async function broadcast(actionName, data) {
    for (let [id, sockets] of userIdToSocketsMap) {
        for (let socket of sockets) {
            console.log("Action: " + actionName, id)
            socket.emit(actionName, data);
        }
    };
};

function getUserIdFromSocket(socket){
    let handshakeData = socket.request;
    let token = handshakeData._query['token'];
    let userId = jwt_decode(token).userId;
    return userId;
}

httpServer.listen(3002, () => console.log("Listening to sockets.io at port 3002"));

module.exports = {
    broadcast
}