const express = require("express");
const workoutController = require("../../controllers/workoutController.js");

const router = express.Router();

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.post("/", workoutController.createNewWorkout);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
