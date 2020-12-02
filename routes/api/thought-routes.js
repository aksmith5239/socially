const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');
//set up GET and POST routes
router
    .route('/')
    .get(getAllThought)
    .post(createThought);

//set up GET one, PUT and DELETE
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


module.exports = router;
