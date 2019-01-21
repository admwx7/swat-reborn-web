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
    if (req.query.count && isNan(req.query.count)) {
      throw new ServerError({
        code: 400,
        message: 'Count must be omitted or a valid number',
      });
    }
    if (!process.env.swatServer) {
      throw new ServerError({
        code: 500,
        message: 'Missing or invalid server environment variables',
      });
    }
    const response = await (await fetch(`${process.env.swatServer}/leaderboards/getAll?${req.query.count ? `maxSummaries=${req.query.count}` : ''}`)).json();
    res.status(200).send(response || {});
  } catch(error) {
    res.status(error.code).json(error);
  }
};
