const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const Task = require("../../../models/Task");

/**
 * @route   GET /api/v1/tasks
 * @desc    Get all tasks for the logged in user
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
        return res.json(tasks);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

/**
 * @route   GET /api/v1/tasks/{id}
 * @desc    Get task by id
 * @access  Private
 */
router.get("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({ msg: "User not authorised" });
        }

        return res.json(task);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

/**
 * @route   GET /api/v1/tasks/{id}/project
 * @desc
 * @access
 */

/**
 * @route   GET /api/v1/tasks/{id}/labels
 * @desc
 * @access
 */

/**
 * @route   POST /api/v1/tasks
 * @desc    Add a task for the logged in user
 * @access  Private
 */
router.post(
    "/",
    auth,
    [
        check("body", "A task body is required")
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const newTask = new Task({
                body: req.body.body,
                user: req.user.id,
            });

            const task = await newTask.save();

            return res.json(task);
        } catch (error) {
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    },
);

/**
 * @route   POST /api/v1/tasks/{id}/project
 * @desc
 * @access
 */

/**
 * @route   POST /api/v1/tasks/{id}/labels
 * @desc
 * @access
 */

/**
 * @route   PUT /api/v1/tasks/{id}
 * @desc    Edit a task
 * @access  Private
 */
router.put(
    "/:id",
    auth,
    [
        check("body", "A task body is required")
            .not()
            .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        try {
            const task = await Task.findById(req.params.id);

            if (task.user.toString() !== req.user.id.toString()) {
                return res.status(401).json({ msg: "User not authorised" });
            }

            task.body = req.body.body;

            const updatedTask = await task.save();

            return res.json(updatedTask);
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    },
);

/**
 * @route   DELETE /api/v1/tasks/{id}
 * @desc
 * @access
 */
router.delete("/:id", auth, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task.user.toString() !== req.user.id.toString()) {
            return res.status(401).json({ msg: "User not authorised" });
        }

        task.remove();

        return res.status(200).json({ msg: "Task deleted" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

/**
 * @route   DELETE /api/v1/tasks/{id}/project/{id}
 * @desc
 * @access
 */

/**
 * @route   DELETE /api/v1/tasks/{id}/labels/{id}
 * @desc
 * @access
 */

module.exports = router;
