const socketio= require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = []; 

exports.setupWebsocket = (server)=>{
  //console.log('ok') //teste
  io = socketio(server);

  io.on('connection', socket =>{
    const{latitude, longitude, techs} = socket.handshake.query;
    // console.log(socket.id); //ver se uma aplicao esta conectando com a outra
    // console.log(socket.handshake.query);

    connections.push({
      id:socket.id,
      coordinates:{
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: parseStringAsArray(techs),
    });

    // setTimeout(()=>{
    //     socket.emit('message','Olá, tudo certo por aqui.')
    // },3000) //ctrl + ; comentar

  });
};

exports.findConnections =(coordinates,techs)=>{
  return connections.filter(connection =>{
    return calculateDistance(coordinates, connection.coordinates)<10 //10km
    && connection.techs.some(item => techs.includes(item))
  })
}

exports.sendMessage = (to, message, data)=>{
  to.forEach(connection =>{
    io.to(connection.id).emit(message, data);
  })
}