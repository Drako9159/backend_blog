const { Router } = require("express");
const { loginController } = require("../controllers/auth.controller");
const router = Router();

router.post("/login", loginController);

router.post("/v2/login", loginController);

module.exports = router