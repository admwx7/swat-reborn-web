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
    const response = await (await fetch(`${process.env.swatServer}/playerStats/get?steamIds=${req.query.steamId}`)).json();
    if (!response || response.length <= 0) {
      throw new ServerError({
        code: 500,
        message: 'invalid or unregistered steamId, you much play at least one game to register a steamId',
      });
    }
    res.status(200).json(response[0]);
  } catch(error) {
    res.status(error.code).json(error);
  }
};
