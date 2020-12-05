const { Thought, User } = require('../models');

const thoughtController = {
    // getAllThought() {},
    // getThoughtByID(){},
    
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: {thoughts: _id} },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: "We do not find that user"});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },

    // updateThought() {},
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if(!deletedThought) {
                    return res.status(404).json({message: "We could not find this thought"});
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: {thoughts: params.thoughtId } },
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

    
}

module.exports = thoughtController;
