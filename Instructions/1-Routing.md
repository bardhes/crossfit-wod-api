# Routing

## A note about versioning...

The author rightly points out that out that we should assume that our API will need to change in the future.

In order to support callers of the existing endpoints, we need to be able to version our API.

This allows us to make any necessary breaking changes, without actually breaking the existing consumers of our API.

Examples of breaking changes are:

- Additional mandatory parameters that cannot be defaulted

The author points out there are many ways this can be achieved, and I'm personally aware of meetings where developers have _argued_ over the best versioning strategy.

So I guess it's not surprising that I have a differing view to the author! 😆

### The Author's Steps

The author proposes having a version folder at the root of the project:

```
mkdir src/v1

# Get the path to your current directory (copy it)
pwd

# Move "routes" into "v1" (insert the path from above into {pwd})
mv {pwd}/src/routes {pwd}/src/v1

# In /src/v1/routes
touch index.js
```

They say:

> We just moved our routes folder into our v1 directory. The other folders like controllers or services still remain inside our src directory. That is okay for now because we are building a rather small API. We can use the same controllers and services in each version globally.
>
> When the API is growing and requires different controller methods specific for v2, for example, it would be a better idea to move the controllers folder into the v2 directory as well to have all specific logic for that particular version encapsulated.
>
> Another reason for that could be that we might change a service that is used by all other versions. We don't want to break things in the other versions. So it would be a wise decision to move the services folder also into a specific version folder.

I'm not sure how I feel about this. My gut says that the routes and controllers are probably tightly coupled and likely to change together, so putting them into a v1 folder from the outset is good. Would you have different _versions_ of the services though? 🤔

There is a danger of spending too much time trying to predict the future. The aim is to take time on the decisions that are hard or impossible to reverse, and moving the existing services directory into a new location shouldn't be hard... right?!

### My Preference

```
mkdir routes/v1
```

**Spoiler Alert!** I'm partly doing this so I can have an `index.js` in `routes` so that I can then register the routes from here, and not have to keep modifying `index.js` in the root of the project. 🤫

My opinion is that having to modify `src/index.js` every time a new route is added is a smell.

### Alternatives

Although the routes and controllers are likely tightly coupled (when you change one, you'll change the other) on balance I've decided to keep the concerns separate.

An alternative approach would be to have a structure that was organised by domain.

Instead of versioning the api, you could version the domain or individual endpoints.

## Back to Routing...

Inside the folder you created (`v1/routes` or in my case `routes/v1`) paste the following into the `index.js`

```
const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send(`<h2>Hello from ${req.baseUrl}</h2>`);
});

module.exports = router;
```

Add the router to the app in the `src/index.js` file:

```
const v1Router = require("./v1/routes"); // Or your path: routes/v1 etc.
...
app.use("/api/v1", v1Router);

```

Now if you visit `localhost:3000/api/v1` you should see the text `Hello from /api/v1`
