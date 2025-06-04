const express = require('express');
const router = express.Router();
const { getLeadsByUser } = require('../controllers/leadController');

router.get('/:userId', getLeadsByUser);

module.exports = router;
