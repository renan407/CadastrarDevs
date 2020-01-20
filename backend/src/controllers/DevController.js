const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const {findConnections, sendMessage} = require('../websocket');

//index, show, store, update, destroy
module.exports = {
  async index(request, response){
    const devs = await Dev.find(); //consegue-se fazer filtros aqui dentro

    return response.json(devs);
  },


  async store(request, response){ //async para chamadas q podem demorar a responder //await aguarda a chamada
    const {github_username, techs, latitude, longitude} = request.body; //desestruturacao
  
    let dev = await Dev.findOne({github_username});
    
    if(!dev){
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`) //com o use das crases consigo usar variaveis
   
    const {name = login, avatar_url, bio} = apiResponse.data; // caso o nome nao exista pegar o login

    const techsArray = parseStringAsArray(techs);
  
    const location ={
      type: 'Point',
      coordinates: [longitude, latitude], // mongodb utiliza primeiro o longitude depois latitude
  
    };
    
     dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      bio,
      techs: techsArray,
      location,
    })
      //filtrar as conexoes que estao ha no maxino 10km de distancia 
      //e que o novo deve tenha pelo menos uma das tecnologias filtradas
      const sendSocketMessageTo = findConnections(
        {latitude, longitude},
        techsArray,
      )
        //console.log(sendSocketMessageTo);
        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
    
    return response.json(dev);
  }
};