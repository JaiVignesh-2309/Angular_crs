const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');


mongoose.connect("mongodb+srv://jaivm:9VtXIxXOfzFvp8F9@cluster0-ge9ud.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("connecting db success");
})
.catch(() => {
  console.log("error connecting db");
});

const app = express();

// TO RESTRICT 2 TIME CALL (due to favicon)
// function ignoreFavicon(req, res, next) {
//   if (req.originalUrl === '/favicon.ico') {
//     res.status(204).json({nope: true});
//   } else {
//     next();
//   }
// }

// app.use(ignoreFavicon);

// Add body parser to parse the data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



app.use((req, res, next) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // OPTIONS IS DEFAULT BY CHROME AND ANGULAR
  res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PATCH, PUT, OPTIONS");

  next();
});


app.use("/api/posts", postRoutes);

module.exports = app;
// 9VtXIxXOfzFvp8F9
