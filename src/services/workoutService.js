const { v4: uuid } = require("uuid");
const Workout = require("../database/workout");

const getAllWorkouts = () => {
  const allWorkouts = Workout.getAllWorkouts();
  return allWorkouts;
};

const getOneWorkout = () => {
  return;
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-GB", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-GB", { timeZone: "UTC" }),
  };

  const createdWorkout = Workout.createNewWorkout(workoutToInsert);

  return createdWorkout;
};

const updateOneWorkout = () => {
  return;
};

const deleteOneWorkout = () => {
  return;
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
