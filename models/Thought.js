const { model, Schema } = require("mongoose");

const thoughtSchema = new Schema(
    {
        username: { type: String, required: true },
    }
);

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;