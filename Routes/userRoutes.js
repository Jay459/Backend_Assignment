const userControllers = require("./../Controllers/userControllers");
const accessControllers = require("./../Middleware/accessControllers")
const auth = require("./../Middleware/auth");
const express = require('express');
const router = express.Router();

router.post('/signup', userControllers.signup);

router.post('/login', userControllers.login);

router.get('/user/get', auth, userControllers.getUser);

router.get('/users/getall', auth, accessControllers.grantAccess('readAny', 'profile'), userControllers.getUsers);

router.put('/user/edit', auth, accessControllers.grantAccess('updateAny', 'profile'), userControllers.updateUser);

router.delete('/user/delete', auth, accessControllers.grantAccess('deleteAny', 'profile'), userControllers.deleteUser);


module.exports = router;