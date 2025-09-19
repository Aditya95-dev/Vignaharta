const express = require('express');
const { getDashbord } = require('../../controllers/Dashboard/getDashbord');
const router = express.Router();

router.get('/dashboard',getDashbord)

module.exports = router;