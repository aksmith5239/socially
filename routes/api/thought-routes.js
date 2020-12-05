const router = require('express').Router();

const { 
    getAllThought,
    getThoughtById,
    updateThought,
    addThought, 
    removeThought,
    deleteThought } = require('../../controllers/thought-controller');


router
    .route('/')
    .get(getAllThought)
    
//set up GET one, PUT and DELETE
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);
router
    .route('/:userId').post(addThought);

router
    .route('./userId/:thoughtId').delete(removeThought);


module.exports = router;
