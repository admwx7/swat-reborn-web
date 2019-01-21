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
  let client;

  try {
    client = new (await Issuer.discover(process.env.steamIssuer)).Client({
      client_id: process.env.steamId,
      client_secret: process.env.steamSecret,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, error });
  }

  const authorizationUrl = client.authorizationUrl({
    redirect_url: process.env.callbackUrl,
    scope: 'openid',
  });

  try {
    await new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    return res.status(500).json({ status: 500, error });
  }

  return res.status(200).json({ status: 200, authorizationUrl });
};
