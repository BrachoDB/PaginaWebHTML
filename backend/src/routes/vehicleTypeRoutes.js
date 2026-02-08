const express = require('express');
const router = express.Router();
const vehicleTypeController = require('../controllers/vehicleTypeController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/', [verifyToken], vehicleTypeController.getVehicleTypes);

module.exports = router;
