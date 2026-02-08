const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/dashboard', [verifyToken, isAdmin], statsController.getDashboardStats);
router.get('/reports', [verifyToken, isAdmin], statsController.getReports);

module.exports = router;
