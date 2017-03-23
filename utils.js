var url = require('url');


const specialEncode = function (input) {
    return encodeURIComponent(input).replace(/[!'()]/g, escape).replace(/\*/g, '%2A');
};
exports.specialEncode = specialEncode;

/*
  get keys and values, join with &, urlencode
*/
exports.cleanRequestBody = function (body, query) {
  const cleanParams = (params) => {

    let out = [];

    Object.keys(params)
      .filter(key => key !== 'oauth_signature') //Strip oauth_signature from props
      .forEach((key) => {
        if (Array.isArray(params[key])) {
          out.push(...params[key].map(val => `${key}=${specialEncode(val)}`));
        } else {
          out.push(`${key}=${specialEncode(params[key])}`);
        }
      });

    return out;
  };

  const result = cleanParams(body);
  result.push(cleanParams(query));
    
  return specialEncode(result.sort().join('&'));
};

/*
  get url in an object
*/
exports.parseUrl = function (req) {
  let originalUrl = req.originalUrl || req.url;

  if (req.body.tool_consumer_info_product_family_code === 'canvas') {
    originalUrl = url.parse(originalUrl).pathname;
  }

  return url.parse(originalUrl, true);
};

/*
  get request protocol
*/
exports.protocolFromRequest = function (req) {
  if (req.protocol) {
    return req.protocol;
  }

  if (req.connection.encrypted) {
    return 'https';
  }

  return 'http';
};


