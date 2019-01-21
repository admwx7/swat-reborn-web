/**
 * Environment Variables
 *  swatServer
 */

const fetch = require('node-fetch');
class ServerError {
  constructor({ code, message }) {
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
    if (!process.env.swatServer) {
      throw new ServerError({
        code: 500,
        message: 'Missing or invalid server environment variables',
      });
    }
    const [playerInfo] = await (await fetch(`${process.env.swatServer}/playerInfos/get?steamIds=${req.query.steamId}`)).json();
    if (!playerInfo || (playerInfo.playerData.renown === 1 && playerInfo.playerData.renownXP === 0)) {
      throw new ServerError({
        code: 500,
        message: 'invalid or unregistered steamId, you much play at least one game to register a steamId',
      });
    }
    res.status(200).json(playerInfo);
  } catch(error) {
    res.status(error.code).json(error);
  }
};
