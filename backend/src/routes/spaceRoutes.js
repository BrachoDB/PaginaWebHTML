const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', [verifyToken], spaceController.getAllSpaces);

module.exports = router;
