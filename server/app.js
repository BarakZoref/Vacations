const express = require('express');
const cors = require('cors');
const server = express();
const vacationsController = require('./controllers/vacations-controller');
const usersController = require('./controllers/users-controller');
const followsController = require('./controllers/follows-controller');
const loginFilter = require('./middleware/login-filter');



server.use(cors({ origin: "http://localhost:3000"})); 
// Extract the JSON from the body and create request.body object containing it: 
server.use(loginFilter());

server.use(express.json());
server.use("/vacations",vacationsController);
server.use("/users", usersController);
server.use("/follows", followsController);

server.listen(3001, () => console.log("Listening on http://localhost:3001"));