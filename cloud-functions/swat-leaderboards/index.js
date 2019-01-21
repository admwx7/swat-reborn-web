/**
 * Environment Variables
 *  swatServer
 */

const fetch = require('node-fetch');

exports.function = async (req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');

  const response = await (await fetch(`${process.env.swatServer}/leaderboards/getAll?${req.query.count ? `maxSummaries=${req.query.count}` : ''}`)).json();
  res.status(200).send(response);
};
