const getAllWorkouts = (req, res) => {
  res.send("<h1>🏋️‍♀️ Get all workouts</h1>");
};

const getOneWorkout = (req, res) => {
  res.send("🏋️‍♀️ Get an existing workout");
};

const createNewWorkout = (req, res) => {
  res.send("🏋️‍♀️ Create a new workout");
};

const updateOneWorkout = (req, res) => {
  res.send("🏋️‍♀️ Update an existing workout");
};

const deleteOneWorkout = (req, res) => {
  res.send("<h1>🏋️‍♀️ Delete an existing workout</h1>");
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
