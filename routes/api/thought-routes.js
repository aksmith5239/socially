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
    
//set up GET one, PUT and DELETE
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    

router.route('/:userId').post(createThought)
router.route('/:userId/:thoughtId').delete(deleteThought)
    
    


module.exports = router;
