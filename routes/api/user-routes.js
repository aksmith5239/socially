const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');
//set up GET and POST routes
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

//set up GET one, PUT and DELETE
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;

