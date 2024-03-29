const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
    },
    body: {
        type: String,
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "projects",
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

module.exports = Task = mongoose.model("task", TaskSchema);
