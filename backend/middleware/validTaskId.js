function validateTaskId(req, res, next) {
    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId) || taskId < 1) {
        return res.status(400).json({
            error: "Task ID must be a positive integer",
        });
    }

    req.taskId = taskId;
    
    next();
}

module.exports = validateTaskId;