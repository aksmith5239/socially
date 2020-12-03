const { Schema, model, Types} = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    }, 
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
        toJSON: {
            getters: true
        }    
    }
);

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
        
    },
    createdAt: {
        type: Date,
        default: Date.now
        
    },
    username: {
        type: String,
        required: true
    },
    //array of nested documents created with the reaction schema
     reactions: [ReactionSchema]
 },
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});


ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;