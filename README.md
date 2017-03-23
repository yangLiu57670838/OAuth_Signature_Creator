OAuth_Signature_Creator
=========

A small library that build oauth_signature for lti usage

## Installation

  `npm install @yangliu57670838/OAuth_Signature_Creator`

## Usage

    var OAuth_Signature_Creator = require('@yangliu57670838/OAuth_Signature_Creator');

    const signature = this.signatureBuilder(req, secret);
    
    if (!signature === req.body.oauth_signature) {
        reject('Invalid OAuth signature');
      }

# Information
- This function is for Lti Usage, so the base string and key are hashed with HMAC-SHA1
- This method only takes course secret and request body as parameters
- You need to install Node.js, Express, Crypto, url before using this module