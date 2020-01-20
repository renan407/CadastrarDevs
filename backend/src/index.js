const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const http= require('http'); //extraind http de dentro do express
const {setupWebsocket} = require('./websocket')

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-2k2xq.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true); /*Tirar caso de erro */

app.use(cors());
app.use(express.json());//tem que vim antes das rotas
app.use(routes);

/*Definindo porta */
server.listen(3333);