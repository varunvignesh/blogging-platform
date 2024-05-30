// External Dependencies
const jwt = require("jsonwebtoken");

// Internal Modules
const config = require("../../../config/config");

class JWTHelper {
  static sign(user) {
    const token = jwt.sign(
      {
        user_id: user.id,
      },
      config.jwt_secret,
      {
        expiresIn: 1814400, // Three Week in seconds
      },
    );

    return token;
  }
}

module.exports = JWTHelper;
