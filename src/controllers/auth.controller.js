const { handleError } = require("../utils/handleError");
const { tokenSign } = require("../utils/handleJwt");

async function loginController(req, res) {
  try {
    //receive user:correo, rol:type user
    const { user, rol } = req.body;
    const data = {
      token: tokenSign(user, rol),
    };
    if (data.token === "NOT_AUTHORIZATION") {
      handleError(res, data.token, 403)
    }
    res
      .header("Acess-Control-Allow-Origin", "*")
      .header("Acess-Control-Allow-Credentials", true)
      .header("Content-Type", "application/json; charset=utf-8")
      .header("authorization", data.token)
      .send({ token: data.token });
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
      
  } catch (error) {
    handleError(res, "ERROR_LOGIN_USER", 403);
  }
}

module.exports = { loginController };
