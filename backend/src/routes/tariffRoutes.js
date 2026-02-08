const express = require('express');
const router = express.Router();
const tariffController = require('../controllers/tariffController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', [verifyToken], tariffController.getTariffs);
router.post('/', [verifyToken, isAdmin], tariffController.createTariff);
router.put('/:id', [verifyToken, isAdmin], tariffController.updateTariff);
router.delete('/:id', [verifyToken, isAdmin], tariffController.deleteTariff);

module.exports = router;
