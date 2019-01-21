/**
 * Environment Variables
 *  swatServer
 */

const fetch = require('node-fetch');

exports.function = async (req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');

  const response = await (await fetch(`${process.env.swatServer}/matches/get?id=${req.query.matchId}`)).json();
  res.status(200).send(response);
};
