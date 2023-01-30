const { verifyToken } = require("../utils/handleJwt");
const { handleError } = require("../utils/handleError");


async function authMiddleware(req, res, next) {
  try {
    if (!req.headers.authorization) {
      handleError(res, "NOT_TOKEN_PROVIDER", 401);
      return;
    }
    const token = req.headers.authorization.split(" ").pop();
    const dataToken = verifyToken(token);
    if (!dataToken) {
      handleError(res, "NOT_PAYLOAD_DATA", 401);
      return;
    }
    const query = {
      id: dataToken.id,
    };
    next();
  } catch (error) {
    handleError(res, "NOT_SESSION", 401);
  }
}

module.exports = { authMiddleware };
