const express = require("express");
const cors = require("cors");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRouter);
    
// Basic route to check if the server is running
app.get("/", (req, res) => {
    res.json({ message: "Task Manager API is running..." });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
