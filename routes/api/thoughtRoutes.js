const router = require("express").Router();
const { Thought, User } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async(req, res) => {
    try {
        const thought = await Thought.create(req.body);
        await User.findOneAndUpdate(thought.username, 
            { $push: {thoughts: thought._id}});
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(req.params.id, req.body);
        res.sendStatus(200);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const thought = await Thought.findByIdAndDelete(req.params.id);
        await User.findOneAndUpdate(thought.username, 
            { $pull: {thoughts: thought._id}});
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/:thoughtId/reactions", async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(req.params.thoughtId, 
            { $push: {reactions: req.body}});
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
    try {
        await Thought.findByIdAndUpdate(req.params.thoughtId, 
            { $pull: {reactions: {reactionId: req.params.reactionId}}});
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;