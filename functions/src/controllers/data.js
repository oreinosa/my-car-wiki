var axios = require("axios").default;

const getTypes = async (req, res) => {
  var options = {
    method: 'GET',
    url: 'https://car-data.p.rapidapi.com/cars/types',
    headers: {
      'x-rapidapi-host': 'car-data.p.rapidapi.com',
      'x-rapidapi-key': '256c766282mshf1ac5b6004ad947p1898a0jsn6d377c1382f0'
    }
  };
  try {
    const { data } = await axios.request(options);
    return res.status(200).json({ message: "Ok", data });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Please try again later" });
  }

}

module.exports = {
  getTypes
}