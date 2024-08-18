const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();

  res.send({ status: "OK", data: allWorkouts });
};

const getOneWorkout = (req, res) => {
  const workout = workoutService.getOneWorkout();

  res.send("🏋️‍♀️ Get an existing workout");
};

const createNewWorkout = (req, res) => {
  const createdWorkout = workoutService.createNewWorkout();

  res.send("🏋️‍♀️ Create a new workout");
};

const updateOneWorkout = (req, res) => {
  const updatedWorkout = workoutService.updateOneWorkout();

  res.send("🏋️‍♀️ Update an existing workout");
};

const deleteOneWorkout = (req, res) => {
  workoutService.deleteOneWorkout();

  res.send("<h1>🏋️‍♀️ Delete an existing workout</h1>");
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
