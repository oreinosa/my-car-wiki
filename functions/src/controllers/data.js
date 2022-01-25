const functions = require('firebase-functions');
var axios = require("axios").default;
const admin = require('../config/firebase-admin');

const getTypes = async (req, res) => {
  try {
    const { docs } = await admin.firestore().collection('types').orderBy('name', 'asc').get();
    const data = docs.map(doc => doc.data());
    return res.status(200).json({ message: "Ok", data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Please try again later" });
  }
}
const getMakes = async (req, res) => {
  try {
    const { docs } = await admin.firestore().collection('makes').orderBy('name', 'asc').get();
    const data = docs.map(doc => doc.data());
    return res.status(200).json({ message: "Ok", data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Please try again later" });
  }
}

const getYears = async (req, res) => {
  try {
    const { docs } = await admin.firestore().collection('years').orderBy('name', 'asc').get();
    const data = docs.map(doc => doc.data());
    return res.status(200).json({ message: "Ok", data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Please try again later" });
  }
}

const getCars = async (req, res) => {
  try {
    const { limit, page, year, type, make, model } = req.query;
    if (page && page < 0) {
      return res.status(400).json({ message: "Page param must be equal or more than 0." });
    }
    if (limit && limit >= 50) {
      return res.status(400).json({ message: "Limit param must be less than 50." });
    }
    const params = {
      limit: limit || '10',
      page: page || '0',
      year: year || undefined,
      type: type || undefined,
      make: make || undefined,
      model: model || undefined
    };
    const options = {
      method: 'GET',
      params,
      url: `https://car-data.p.rapidapi.com/cars`,
      headers: {
        'x-rapidapi-host': functions.config().rapidapi.host,
        'x-rapidapi-key': functions.config().rapidapi.key
      }
    };
    const { data } = await axios.request(options);
    return res.status(200).json({ message: "Ok", data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Please try again later" });
  }
}

module.exports = {
  getTypes,
  getMakes,
  getYears,
  getCars
}