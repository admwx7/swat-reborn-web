/**
 * Environment Variables
 *  steamKey
 *  steamServer
 */

const fetch = require('node-fetch');

exports.function = async (req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');

  const response = await (await fetch(`${process.env.steamServer}/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.steamKey}&steamids=${req.query.steamId}`)).json();
  res.status(200).send(response.response.players[0]);
};
