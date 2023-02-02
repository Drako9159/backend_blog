const { handleError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJwt");

const KEY = process.env.KEY | "drako9159@gmail.com";

async function loginController(req, res) {
  try {
    //receive user:correo, rol:type user
    const { user, rol } = req.body;
    const data = {
      token: tokenSign(user, rol),
    };
    if (data.token === "NOT_AUTHORIZATION") {
      res
        .status(403)
        .header("authorization", data.token)
        .json({ error: data.token });
      return;
    }
    res
      .header("Acess-Control-Allow-Origin", "*")
      .header("Acess-Control-Allow-Credentials", true)
      .header("authorization", data.token)
      //for only send specific credentials
      //.header("access-control-expose-headers", "authorization")

      //.header("Content-Type", "application/json; charset=ISO-8859-1")
      /*
      .header("Content-Encoding", "gzip")
      .header("X-Cloud-Trace-Context", "46f0d68a28c13555fe4d18c37ceff90f")
      .header("Vary", "Accept-Encoding")
      .header("Date", "Sat, 03 Dec 2016 19:20:25 GMT")
      .header("Server", "Google Frontend")
      .header("Cache-Control", "private")*/
      /*
      .header(
        "Acess-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      )*/
      //.header("x-auth-token", "lolin")
      .json({ token: data.token });
  } catch (error) {
    handleError(res, "ERROR_LOGIN_USER", 403);
  }
}

module.exports = { loginController };
