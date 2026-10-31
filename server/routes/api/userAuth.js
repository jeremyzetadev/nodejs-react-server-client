import express from 'express';
import userAuthController from '../../controllers/userAuthController.js';
const router = express.Router();

router.route("/")
    .get(userAuthController.getAllUserAuth)
    .post(userAuthController.createNewUserAuth)
    .put(userAuthController.updateUserAuth)
    .delete(userAuthController.deleteUserAuth)

router.route('/:id')
    .get(userAuthController.getUserAuth)

export default router;
// before-ES6
// module.exports = router
