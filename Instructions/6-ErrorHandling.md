# Respond with standard HTTP Error Codes

When something goes wrong we should be sending HTTP error codes back, along with some helpful information to enable fault diagnosis and resolution but without leaking too much information.

This is the strategy the author of the article recommends. I might adjust when I refactor!

## Add validation errors to `createNewWorkout` `workoutController` method

If the check for a valid request fails, we can return a more helpful error message by pasting the following above the `return;` statement:

```
res
    .status(400)
    .send({
    status: "FAILED",
    data: {
        error:
        "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
    },
});
```

## Add error handling to the `createNewWorkout` `workoutService` method

External services like databases are outside the control of out application and can fail for a number of reasons.

Wrap the call to the database access layer (`workout`) in a `try..catch`.

```
  try {
    const createdWorkout = Workout.createNewWorkout(workoutToInsert);
    return createdWorkout;
  } catch (error) {
    throw error;
  }
```

# Defining errors in `workout` database access layer

We already catch when a workout has already been added. Let's thow an error instead:

```
throw {
      status: 400,
      message: `Workout with the name '${newWorkout.name}' already exists`,
    };
```

Let's wrap the database access in a `try..catch` to capture and re-throw errors that might occur when we try and interact with the database:

```
try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
```

## Add error handling to the `createNewWorkout` `workoutController` method

Now we can go back to the `workoutController`and add a `try...catch` to capture errors that might happen further down the stack.

```
 try {
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
```

## Test

If you send the same payload we send in the [Receiving Json](4-ReceivingJson.md) test, a duplicate workout won't return an object with a `status` property set to `OK` any more.

You should get a `400` response with the body set to:

```
{
    "status": "FAILED",
    "data": {
        "error": "Workout with the name 'Core Buster' already exists"
    }
}
```
