const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

const {findConnections, SendMessage} = require('../websocket');

module.exports = {

  async index (req, res) {
    const devs = await Dev.find();
    return res.json(devs)
  },


  async store (req, res) {
    try {
      const {github_username, techs, latitude, longitude} = req.body;

      let dev = await Dev.findOne({github_username});

      if (!dev) {
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
    
        const {name = login, avatar_url, bio} = apiResponse.data;
      
        const techsArray = parseStringAsArray(techs);
      
        const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
        }
      
        dev = await Dev.create({ 
          github_username,
          name,
          avatar_url,
          bio,
          techs : techsArray,
          location,
        })

        //filtrar conexões que estão à 10km distancia e que possuem tenha uma das
        //techs filtradas

        const sendSocketMessageTo = findConnections(
          {latitude, longitude},
          techsArray,
        )

        SendMessage(sendSocketMessageTo, 'new-dev', dev)
      }
      return res.json(dev)

    } catch (err){
      console.log(err);
    }
  }
}