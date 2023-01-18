const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate("thoughts").populate("friends");
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;