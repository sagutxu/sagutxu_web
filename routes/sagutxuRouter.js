const express = require('express');
const router = express.Router();
const sagutxu_controller = require("../controllers/sagutxuController");

router.get('/', sagutxu_controller.sagutxu_index);

router.get('/login', sagutxu_controller.sagutxu_login);

router.post('/auth', sagutxu_controller.sagutxu_authentication);

router.get('/estadisticas', sagutxu_controller.sagutxu_estadisticas);

router.get('/control', sagutxu_controller.sagutxu_control);

router.get('/registro', sagutxu_controller.sagutxu_registro);

router.get('/logout', sagutxu_controller.sagutxu_logout);

router.post('/registro_auth', sagutxu_controller.sagutxu_registro_auth)

module.exports = router