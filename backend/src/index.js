const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const http = require('http');
const {setupWebsocket} = require('./websocket')

const app = express();
const server = http.Server(app);
setupWebsocket(server);


mongoose.connect('mongodb+srv://breno:@silva2013@cluster0-c154w.mongodb.net/week10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(cors());
app.use(express.json()); // tem que vir antes das rotas
app.use(routes); 


server.listen(3333);
