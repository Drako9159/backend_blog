const jwt = require("jsonwebtoken");
const JWT_SECRET = "drakolin";


const KEY_EMAIL = "drako9159@gmail.com";

function tokenSign(user, rol) {
    
  //comprobate mail
  /*
  if(user === KEY_EMAIL) {
    console.log("es el email")
  } else {
    console.log("no es el email")
  }*/
  if (user !== KEY_EMAIL) return "NOT_AUTHORIZATION";
  if (user === KEY_EMAIL) return getToken(user, rol);
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
