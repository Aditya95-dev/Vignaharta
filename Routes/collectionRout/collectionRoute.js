const express = require('express');
const { addCollection } = require('../../controllers/Collection/add');
const { getAllCollection } = require('../../controllers/Collection/get');
const { getByUserId } = require('../../controllers/Collection/getByUserId');
const { updateCollections } = require('../../controllers/Collection/update');
const router = express.Router();


router.post('/add', addCollection);
router.get('/get', getAllCollection);
router.get('/get/:userId', getByUserId);
router.put('/update', updateCollections);


module.exports = router;