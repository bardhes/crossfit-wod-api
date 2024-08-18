# Group associated resources together (logical nesting)

Imagine that you've been asked to extend the API.

As a way of motivating members, we want to track records for each workout.

There are two kinds of workouts:

- Fastest time challenges
- Number of repetitions (reps) challenges

## Logical nesting

In this scenario it makes sense for the url for the `records` endpoint to be ` /api/v1/workouts/:workoutId/records`.

# Implement the new endpoint

## Add data to `db.json`

In the `workouts` section, set the `id` of the `Core Buster` workout to `a24d2618-01d1-4682-9288-8de1343e53c7`:

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
        "Split your toes to bars in two sets maximum",
        "Go unbroken on the thrusters",
        "Take the abmat sit-ups as a chance to normalize your breath"
      ],
      "id": "a24d2618-01d1-4682-9288-8de1343e53c7",
      "createdAt": "4/22/2022, 5:50:17 PM",
      "updatedAt": "4/22/2022, 5:50:17 PM"
    }
```

Add `members` and `records` data:

```
{
  "workouts": [ ...
  ],
  "members": [
    {
      "id": "12a410bc-849f-4e7e-bfc8-4ef283ee4b19",
      "name": "Jason Miller",
      "gender": "male",
      "dateOfBirth": "23/04/1990",
      "email": "jason@mail.com",
      "password": "666349420ec497c1dc890c45179d44fb13220239325172af02d1fb6635922956"
    },
    {
      "id": "2b9130d4-47a7-4085-800e-0144f6a46059",
      "name": "Tiffany Brookston",
      "gender": "female",
      "dateOfBirth": "09/06/1996",
      "email": "tiffy@mail.com",
      "password": "8a1ea5669b749354110dcba3fac5546c16e6d0f73a37f35a84f6b0d7b3c22fcc"
    },
    {
      "id": "11817fb1-03a1-4b4a-8d27-854ac893cf41",
      "name": "Catrin Stevenson",
      "gender": "female",
      "dateOfBirth": "17/08/2001",
      "email": "catrin@mail.com",
      "password": "18eb2d6c5373c94c6d5d707650d02c3c06f33fac557c9cfb8cb1ee625a649ff3"
    },
    {
      "id": "6a89217b-7c28-4219-bd7f-af119c314159",
      "name": "Greg Bronson",
      "gender": "male",
      "dateOfBirth": "08/04/1993",
      "email": "greg@mail.com",
      "password": "a6dcde7eceb689142f21a1e30b5fdb868ec4cd25d5537d67ac7e8c7816b0e862"
    },
  ],
  "records": [
    {
      "id": "ad75d475-ac57-44f4-a02a-8f6def58ff56",
      "workout": "4a3d9aaa-608c-49a7-a004-66305ad4ab50",
      "record": "160 reps"
    },
    {
      "id": "0bff586f-2017-4526-9e52-fe3ea46d55ab",
      "workout": "d8be2362-7b68-4ea4-a1f6-03f8bc4eede7",
      "record": "7:23 minutes"
    },
    {
      "id": "365cc0bb-ba8f-41d3-bf82-83d041d38b82",
      "workout": "a24d2618-01d1-4682-9288-8de1343e53c7",
      "record": "358 reps"
    },
    {
      "id": "62251cfe-fdb6-4fa6-9a2d-c21be93ac78d",
      "workout": "4a3d9aaa-608c-49a7-a004-66305ad4ab50",
      "record": "145 reps"
    }
  ],
}
```

## Create the new files

```
# Create records controller
touch src/controllers/recordController.js

# Create records service
touch src/services/recordService.js

# Create records database methods
touch src/database/Record.js
```

## Implement data access layer (`record.js`)

```
const DB = require("./db.json");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);

    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = { getRecordForWorkout };
```

## Implement recordService.js

```
const Record = require("../database/record");

const getRecordForWorkout = (workoutId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId);

    return record;
  } catch (error) {
    throw error;
  }
};

module.exports = { getRecordForWorkout };
```

## Implement the controller

This listing was missing from the article:

```
const recordService = require("../services/recordService");

const getRecordForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;

  if (!workoutId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' cannot be empty" },
    });
  }

  try {
    const record = recordService.getRecordForWorkout(workoutId);

    res.send({ status: "OK", data: record });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getRecordForWorkout,
};
```

## Add route to workoutRoutes.js

```
...
const recordController = require("../../controllers/recordController");
...

router.get("/:workoutId/records", recordController.getRecordForWorkout);

```

## Test

Make a call to `localhost:3000/api/v1/workouts` and copy one of the workout `id` values.

Call `localhost:3000/api/v1/workouts/<id>/records`.

For example, a call to `localhost:3000/api/v1/workouts/a24d2618-01d1-4682-9288-8de1343e53c7/records` should return the following:

```
{
    "status": "OK",
    "data": [
        {
            "id": "365cc0bb-ba8f-41d3-bf82-83d041d38b82",
            "workout": "a24d2618-01d1-4682-9288-8de1343e53c7",
            "record": "358 reps"
        }
    ]
}
```