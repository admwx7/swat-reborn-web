/**
 * Environment Variables
 *  steamIssuer
 *  steamKey
 *  steamSecret
 *  callbackUrl
 */

const { Issuer } = require('openid-client');

exports.function = async (req, res) => {
  res.setHeader('Cache-Control', 'private');
  res.set('Access-Control-Allow-Origin', "*");
  res.set('Access-Control-Allow-Methods', 'GET');
  let response;
  
  try {
    const client = new (await Issuer.discover(process.env.steamIssuer)).Client({
      client_id: process.env.steamId,
      client_secret: process.env.steamSecret,
    });
    return res.status(200).json({ client, response });

    if (!state || !response_type) {
      const authorizationUrl = client.authorizationUrl({
        redirect_url: process.env.callbackUrl,
        scope: 'openid',
      });
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      response = {
        status: 200,
        authorizationUrl,
      };
    } else {
      const tokenSet = await client.authorizationCallback(process.env.callbackUrl, req.query, {
        state,
        response_type
      });
      response = {
        status: 200,
        tokenSet,
      };
    }
  } catch (error) {
    response = {
      status: 500,
      error,
    };
  }
  return res.status(response.status).json(response);
};
