/**
 * Environment Variables
 *  steamKey
 *  steamServer
 */

const fetch = require('node-fetch');
class ServerError {
  constructor({code, message}) {
    this.code = code;
    this.message = message;
  }
}

exports.function = async (req, res) => {
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');

  try {
    if (!req.query.steamId) {
      throw new ServerError({
        code: 400,
        message: 'Missing steamId',
      });
    }
    if (!process.env.steamServer || !process.env.steamKey) {
      throw new ServerError({
        code: 500,
        message: 'Missing or invalid server environment variables',
      });
    }
    const {response} = await (await fetch(`${process.env.steamServer}/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.steamKey}&steamids=${req.query.steamId}`)).json();
    if (!response || !response.players || response.players.length <= 0) {
      throw new ServerError({
        code: 400,
        message: 'Invalid steamId',
      });
    }
    res.status(200).json(response.players[0]);
  } catch(error) {
    res.status(error.code).json(error);
  }
};
