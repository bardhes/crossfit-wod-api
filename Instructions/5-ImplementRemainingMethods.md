# Implement Remaining Methods

You can do this yourself, or just paste the code listings below into the appropriate files.

## workoutcontroller.js

```
const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutService.getAllWorkouts();

  res.send({ status: "OK", data: allWorkouts });
};

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    return;
  }

  const workout = workoutService.getOneWorkout(workoutId);

  res.send({ status: "OK", data: workout });
};

const createNewWorkout = (req, res) => {
  const { body } = req;

  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    return;
  }

  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };

  const createdWorkout = workoutService.createNewWorkout(newWorkout);

  res.status(201).send({ status: "OK", data: createdWorkout });
};

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    return;
  }

  const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);

  res.send({ status: "OK", data: updatedWorkout });
};

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    return;
  }

  workoutService.deleteOneWorkout(workoutId);

  res.status(204).send({ status: "OK" });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
```

## workoutServices.js

```
const { v4: uuid } = require("uuid");
const Workout = require("../database/Workout");

const getAllWorkouts = () => {
  const allWorkouts = Workout.getAllWorkouts();

  return allWorkouts;
};

const getOneWorkout = (workoutId) => {
  const workout = Workout.getOneWorkout(workoutId);

  return workout;
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  const createdWorkout = Workout.createNewWorkout(workoutToInsert);

  return createdWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);

  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  Workout.deleteOneWorkout(workoutId);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
```

## workout.js (database access layer)

```
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutId);

  if (!workout) {
    return;
  }

  return workout;
};

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

  if (isAlreadyAdded) {
    return;
  }

  DB.workouts.push(newWorkout);
  saveToDatabase(DB);

  return newWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForUpdate === -1) {
    return;
  }

  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  DB.workouts[indexForUpdate] = updatedWorkout;
  saveToDatabase(DB);

  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  const indexForDeletion = DB.workouts.findIndex(
    (workout) => workout.id === workoutId
  );

  if (indexForDeletion === -1) {
    return;
  }

  DB.workouts.splice(indexForDeletion, 1);
  saveToDatabase(DB);
};

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
```
