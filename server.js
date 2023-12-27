const express = require("express");
const path = require("path");

const app = express();

// Middleware to set Content-Type for JSON files
app.use((req, res, next) => {
    const filePath = req.path;
    if (filePath.endsWith(".json")) {
      res.setHeader("Content-Type", "application/json");
    }
    next();
  });
// Serve static files from the "frontend/static" directory
/* Ensure any requests prefixed with /static will serve our "frontend/static" directory */
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

/* Redirect all routes to "index.html" */
app.get("/*", (req, res) => {
    res.sendFile(path.resolve("frontend", "index.html"));
});

app.listen(process.env.PORT || 3000, () => console.log("Server running..."));