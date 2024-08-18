# Accepting Json requests

Install the `body-parser` package from `npm`

```
npm i body-parser
```

In `src/index.js` configure the application to parse json payloads.

```
...
const bodyParser = require("body-parser");
...
app.use(bodyParser.json());
...
```

# Database Utils

To persist the changes to workouts and add new workouts, we need to add a helper function.

Add the `utils.js` file to the `database`folder.

```
touch src/database/utils.js
```

Paste the following code into the new file:

```
const fs = require("fs");

const saveToDatabase = (DB) => {
  fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
    encoding: "utf-8",
  });
};

module.exports = { saveToDatabase };
```

# Implement the `createNewWorkout` `workoutController` method

In `workoutController.js` replace the stub for `createNewWorkout` with the following code:

```
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
```

# Add the `createNewWorkout` database method

Replace the code in `src/database/workout.js` with the following:

```
const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
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

module.exports = {
  getAllWorkouts,
  createNewWorkout,
};
```

# Add the `createNewWorkout` implementation to `workoutService.js`

So we can create unique identifiers for the records we insert, we need to install another dependency.

```
npm i uuid
```

This can then be referenced in `workoutService.js`, and used in the implementation of the `createNewWorkout` method:

```
const { v4: uuid } = require("uuid");
...

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

...
```

# Test

Using Postman or your favourite HTTP client, send the following payload in a `POST` request to `localhost:3000/api/v1/workouts`

```
{
  "name": "Core Buster",
  "mode": "AMRAP 20",
  "equipment": [
    "rack",
    "barbell",
    "abmat"
  ],
  "exercises": [
    "15 toes to bars",
    "10 thrusters",
    "30 abmat sit-ups"
  ],
  "trainerTips": [
    "Split your toes to bars into two sets maximum",
    "Go unbroken on the thrusters",
    "Take the abmat sit-ups as a chance to normalize your breath"
  ]
}
```

You should recieve a response that contains the workout that was created with populated `id`, `createdAt` and `updatedAt` properties.

Since there is validation protecting against creating workouts with the same name, sending the same payload a second time returns an object with a `status` property set to `OK`.

A call to `localhost:3000/api/v1/workouts/` should prove that the new workout has been persisted.
