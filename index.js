const crypto = require('crypto');
const utils = require('./utils');


const specialEncode = utils.specialEncode;
const cleanRequestBody = utils.cleanRequestBody;
const parseUrl = utils.parseUrl;
const protocolFromRequest = utils.protocolFromRequest;

module.exports = function (req, secret) {
  const parsedUrl = parseUrl(req);
  const protocol = protocolFromRequest(req);
  const host = req.headers.host.replace(/:80$|:443$/, '');
  const hitUrl = `${protocol}://${host}${parsedUrl.pathname}`;
  const rawSigPieces = [
    req.method.toUpperCase(),
    specialEncode(hitUrl),
    cleanRequestBody(req.body, parsedUrl.query),
  ];

  const rawSig = rawSigPieces.join('&');
  const key = `${secret}&`;

  return crypto.createHmac('sha1', key).update(rawSig).digest('base64');
};
