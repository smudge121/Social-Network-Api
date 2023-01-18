const { model, Schema } = require("mongoose");
const UT = require("unixtimejs");
const reactionSchema = require("./Reaction.js")

const thoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true ,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => UT.toLocaleString(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ]

    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;