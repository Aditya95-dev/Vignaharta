const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.generateToken = (payload) => {

  const jwt_token_secret = process.env.JWT_SECRET;
  const jwt_token_expires_in = process.env.JWT_EXPIRES_IN;

  if (!jwt_token_secret || !jwt_token_expires_in) return;

  return jwt.sign(payload, jwt_token_secret, {
    expiresIn: jwt_token_expires_in,
  });
};

exports.verifyToken = async (token) => {

  const jwt_token_secret = process.env.JWT_SECRET;

  if (!token) return;

  if (!jwt_token_secret) return;

  const decoded = await promisify(jwt.verify)(token, jwt_token_secret);

  return decoded;
};
