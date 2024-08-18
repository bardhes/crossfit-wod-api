# Setup

Create the project structure, initialise and install dependencies:

```
mkdir crossfit-wod-api
cd crossfit-wod-api

mkdir src
cd src

mkdir controllers
mkdir services
mkdir database
mkdir routes

touch index.js

cd ..
npm init -y

// Dev dependency
npm i -D nodemon

// Dependency
npm i express
```

Add the following code to `src/index.js`

```
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// For testing purposes
app.get("/", (req, res) => {
    res.send("<h2>It's Working!</h2>");
});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
```

Add a new script called `dev` to the `scripts` section of `package.json`

```
"scripts": {
    "dev": "nodemon src/index.js"
  },
```

Run the command `npm run dev`

The terminal should display the message "API is listening on port 3000".

Visiting `localhost:3000` should display the text `It's Working!`
