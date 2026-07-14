const express = require("express");
const validTask = require("../middleware/validTask");
const validTaskId = require("../middleware/validTaskId");

const router = express.Router();

// In-memory storage; tasks reset whenever the server restarts
const tasks = [];

// IDs are unique only during the current server process
let nextTaskId = 1;

router.get("/", (req, res) => {
    res.status(200).json(tasks);
});

router.post("/", validTask, (req, res) => {
    const { title, description, priority } = req.body;

    const newTask = {
        id: nextTaskId++,
        title: title.trim(),
        description: description.trim(),
        completed: false,
        createdAt: new Date(),
        priority,
    };
    
    tasks.push(newTask);
    
    res.status(201).json(newTask);
});

router.put("/:id", validTaskId, validTask, (req, res) => {
    const taskId = req.taskId;
    
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found",
        });
    }
    
    const { title, description, priority } = req.body;
    const existingTask = tasks[taskIndex];
    
    const updatedTask = {
        ...existingTask,
        title: title.trim(),
        description: description.trim(),
        priority,
    };
    
    tasks[taskIndex] = updatedTask;
    
    res.status(200).json(updatedTask);
});

router.patch("/:id/toggle", validTaskId, (req, res) => {
    const task = tasks.find((task) => task.id === req.taskId);

    if (!task) {
        return res.status(404).json({
            error: "Task not found",
        });
    }

    task.completed = !task.completed;

    res.status(200).json(task);
});

router.delete("/:id", validTaskId, (req, res) => {
    const taskIndex = tasks.findIndex(
        (task) => task.id === req.taskId
    );

    if (taskIndex === -1) {
        return res.status(404).json({
            error: "Task not found",
        });
    }

    tasks.splice(taskIndex, 1);

    res.status(204).send();
});

module.exports = router;