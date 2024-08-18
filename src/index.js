const express = require("express");
const v1Router = require("./routes/v1");
const v1WorkoutRouter = require("./routes/v1/workoutRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// 🌳 Root route
app.get("/", (req, res) => {
  res.send("<h2>It's Working!</h2>");
});

app.use("/api/v1", v1Router);
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
