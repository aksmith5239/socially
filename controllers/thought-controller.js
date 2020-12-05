const { Thought } = require('../models');

const thoughtController = {
    // get all Thoughts
    getAllThought(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // get one Thought by id
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: "We could not find that Thought!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    //create the Thought - Push created thought to users thought array field
    createThought({ params, body }, res ) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thought: _id} },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "No user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //update the Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: "We could not find the Thought!" });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete the Thought
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.toughtId })
        .then(deletedThought => {
            if(!deletedThought) {
                return res.status(404).json({message: "We could not find that thought"});
            }
            return User.findOneAndUpdate(
                { _id: params.userId},
                {$pull: {user: params.thoughtId} },
                { new: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: "no user found with this id"});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));  
    }

} //end ThoughtController

module.exports = thoughtController;
