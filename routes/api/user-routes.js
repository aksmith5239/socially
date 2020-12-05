const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser, 
    addFriend,
    removeFriend
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

router.route('/:userId/friends/:friendId')
.put(addFriend)
.delete(removeFriend);

// router.route('/:userId/:friendId').delete(removeFriend);

module.exports = router;

