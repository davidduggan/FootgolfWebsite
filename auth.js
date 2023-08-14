const express = require("express");
const authController = require('../controllers/auth');
const router = express.Router();

router.post('/register', authController.register );

router.post('/details', authController.details );

router.post('/password', authController.password );

router.post('/scoreMessage', authController.password );

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get("/upload", authController.upload);

router.post("/upload", authController.upload);

module.exports = router;