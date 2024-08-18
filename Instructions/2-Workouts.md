# Adding Workouts

I'm going to structure these instructions slightly differently compared to the original article.

I'm not deleting the original routes we added for testing.

Rightly or wrongly, I think they are useful for testing and comparison puposes.

## Routing

Add a file to contain the routes for this domain/entity:

```
touch src/v1/routes/workoutRoutes.js
// Or
touch src/routes/v1/workoutRoutes.js
```

Paste the following into that new file:

```
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get all workouts");
});

router.get("/:workoutId", (req, res) => {
  res.send("Get an existing workout");
});

router.post("/", (req, res) => {
  res.send("Create a new workout");
});

router.patch("/:workoutId", (req, res) => {
  res.send("Update an existing workout");
});

router.delete("/:workoutId", (req, res) => {
  res.send("Delete an existing workout");
});

module.exports = router;
```

Modify `src/index.js` to register this new set of routes with the app:

```
const v1WorkoutRouter = require("./v1/routes/workoutRoutes"); // Or your path!
...
app.use("/api/v1/workouts", v1WorkoutRouter);

```

### Test

If you visit `http://localhost:3000/api/v1/workouts` you should see the message `Get all workouts`.

Visiting `http://localhost:3000/api/v1/workouts/123` should display the message `Get an existing workout`.

Using Postman:

- if you send a `POST` request to `localhost:3000/api/v1/workouts` you should see the response `Create a new workout`.
- if you send a `PATCH` request to `localhost:3000/api/v1/workouts/123` you should see the response `Update an existing workout`
- if you send a `DELETE` request to `localhost:3000/api/v1/workouts/123` you should see the response `Delete an existing workout`

## Controller

Add a controller file containing methods that handle each request type and return a response.

```
touch src/controllers/workoutController.js
```

Paste the following code into this new file:

```
const getAllWorkouts = (req, res) => {
  res.send("Get all workouts");
};

const getOneWorkout = (req, res) => {
  res.send("Get an existing workout");
};

const createNewWorkout = (req, res) => {
  res.send("Create a new workout");
};

const updateOneWorkout = (req, res) => {
  res.send("Update an existing workout");
};

const deleteOneWorkout = (req, res) => {
  res.send("Delete an existing workout");
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
```

Modify the `workoutRoutes.js` to call the controller methods.

Replace the code with this version:

```
const express = require("express");
const workoutController = require("../../controllers/workoutController");

const router = express.Router();

router.get("/", workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.post("/", workoutController.createNewWorkout);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
```

### Test

You should see the same results as before.

If you want to prove that you're definitely using the controller method, you change change the messages sightly.
