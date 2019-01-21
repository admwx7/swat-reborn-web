/**
 * Environment Variables
 *  swatServer
 */

const fetch = require('node-fetch');

exports.function = async (req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');

  const response = await (await fetch(`${process.env.swatServer}/playerInfos/get?steamIds=${req.query.steamId}`)).json();
  res.send(response[0]);
};
