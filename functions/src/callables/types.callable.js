const functions = require('firebase-functions');
const axios = require("axios").default;
const { updateCollection } = require('../utils/firebase-helpers');
const collectionName = "types";

const updateTypes = functions.https.onCall(async (data, context) => {
  var options = {
    method: 'GET',
    url: `https://car-data.p.rapidapi.com/cars/${collectionName}`,
    headers: {
      'x-rapidapi-host': functions.config().rapidapi.host,
      'x-rapidapi-key': functions.config().rapidapi.key
    }
  };
  console.log(`Getting new ${collectionName}...`);
  try {
    const { data } = await axios.request(options);
    await updateCollection(collectionName, data);
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  updateTypes
}