const express = require('express');


const app = express();

// TO RESTRICT 2 TIME CALL (due to favicon)
function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}

app.use(ignoreFavicon);

app.use((req, res, next) => {
  console.log("In app.js file");
  next();
});

app.use((req, res, next) => {
  console.log("Inserver");
  res.send("connected to server");
});

module.exports = app;
