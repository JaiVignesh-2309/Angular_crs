const express = require('express');
const bodyParser = require('body-parser');


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
  res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PATCH, OPTIONS")

  next();
});


app.post('/api/addPosts', (req, res, next) => {
  console.log("In server - addPosts");
  const post = req.body;

  console.log(post);

  res.status(201).json({message : "Post added successfully"});
});

app.get('/api/getPosts',(req, res, next) => {

  console.log("In server - getPosts");

  const posts = [
    {
      id : '12321asd',
      title : 'First post',
      content : 'Content of first post'
    },
    {
      id : '14213fre',
      title : 'Second post',
      content : 'Content of Second post'
    }
  ];

  res.status(200).json({ message : 'Posts fetched successfully', posts: posts});
});


module.exports = app;
