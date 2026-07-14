const allowedPriorities = ["low", "medium", "high"];

function validateTask(req, res, next) {
    const { title, description, priority } = req.body;
    
    if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
            error: "Title is required and must be a non-empty string",
        });
    }

    if (typeof description !== "string") {
        return res.status(400).json({
            error: "Description is required and must be a string",
        });
    }

    if (!allowedPriorities.includes(priority)) {
        return res.status(400).json({
            error: "Priority must be low, medium, or high",
        });
    }

    next();
}

module.exports = validateTask;