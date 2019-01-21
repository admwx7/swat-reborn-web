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
    if (!req.query.matchId) {
      throw new ServerError({
        code: 400,
        message: 'Missing matchId',
      });
    }
    if (!process.env.swatServer) {
      throw new ServerError({
        code: 500,
        message: 'Missing or invalid server environment variables',
      });
    }
    const response = await (await fetch(`${process.env.swatServer}/matches/get?id=${req.query.matchId}`)).json();
    res.status(200).json(response || {});
  } catch(error) {
    res.status(error.code).json(error);
  }
};
