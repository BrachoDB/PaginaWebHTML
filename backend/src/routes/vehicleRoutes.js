const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { verifyToken, isOperator } = require('../middlewares/authMiddleware');

// Entry and Exit can be done by Operator or Admin
router.post('/entry', [verifyToken, isOperator], vehicleController.registerEntry);
router.post('/exit', [verifyToken, isOperator], vehicleController.registerExit);
router.post('/quote-exit', [verifyToken, isOperator], vehicleController.quoteExit);
router.get('/search/:plate', [verifyToken, isOperator], vehicleController.findByPlate);

module.exports = router;
