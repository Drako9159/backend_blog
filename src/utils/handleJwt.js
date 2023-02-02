const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const USER_KEY = process.env.USER_KEY;

function tokenSign(user, rol) {
  
  if (user !== USER_KEY) return "NOT_AUTHORIZATION";
  if (user === USER_KEY) return getToken(user, rol);
}

function getToken(user, rol) {
  const sign = jwt.sign(
    {
      user: user,
      rol: rol,
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
  return sign;
}

function verifyToken(tokenJwt) {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
module.exports = { tokenSign, verifyToken };
