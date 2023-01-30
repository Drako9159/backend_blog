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
    res
      .setHeader("authorization", "Bearer" + data.token)
      .send({ message: "AUTHORIZED" });
    ///res.json({ token: data.token });
    //res.setHeader('nana', "lol")
    //res.json({ token: data.token });
  } catch (error) {
    handleError(res, "ERROR_LOGIN_USER", 403);
  }
}

module.exports = { loginController };
