const express = require('express');
const { addUser } = require('../../controllers/User/addUser');
const { login } = require('../../controllers/User/login/login');
const { getMe } = require('../../controllers/User/login/getme');
const { userProtect } = require('../../middleware/protected');
const { getUser } = require('../../controllers/User/getUser');
const { getUserById } = require('../../controllers/User/getUserById');
const { updateUser } = require('../../controllers/User/updateUser');
const router = express.Router();


router.post('/add', addUser)

// login
router.post('/login', login)

// getMe
router.get('/getMe', userProtect, getMe)

// userList
router.get('/get', getUser)
// get User By Id
router.get('/get/:id', getUserById)

// update User
router.put('/update/:id', updateUser)


module.exports = router;