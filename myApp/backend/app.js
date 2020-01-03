const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./model/post')

mongoose.connect("mongodb://jaivm:XVQciUXUUFbHY4Qa@cluster0-shard-00-00-ge9ud.mongodb.net:27017,cluster0-shard-00-01-ge9ud.mongodb.net:27017,cluster0-shard-00-02-ge9ud.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log("connecting db success");
})
.catch(() => {
  console.log("error connecting db");
});

const app = express();
// { useNewUrlParser: true, useUnifiedTopology: true }


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
  res.setHeader("Access-Control-Allow-Methods","GET, POST, DELETE, PATCH, OPTIONS");

  next();
});


// POST REQUEST

app.post('/api/addPosts', (req, res, next) => {

  console.log("In server - addPosts");

  const post = new Post({
    title : req.body.title,
    content: req.body.content
  });
  // const post = req.body;

  console.log(post);
  post.save().then(createdPost => {

    res.status(201).json({message : "Post added successfully", id: createdPost._id});
  });


});

// GET REQUEST

app.get('/api/getPosts',(req, res, next) => {

  console.log("In server - getPosts");

// Use of callback
// Post.find((err, res1) => {
//   console.log(res1);
//   const posts = res1;
//   res.status(200).json({ message : 'Posts fetched successfully', posts: posts});
// });

Post.find()
.then((result) => {

  console.log(result);
  const posts = result;
  res.status(200).json({ message : 'Posts fetched successfully', posts: posts});

})
.catch(() => {
  console.log("Error in getting posts");
});

});


// DELETE REQUEST

app.delete("/api/deletePost/:id", (req, res, next) => {

  console.log(req.params.id);

  console.log("In server - deletePost");

Post.deleteOne({ _id: req.params.id }).then((result) => {

  console.log("Delete Successful")
  res.status(200).json({ message : 'Post deleted successfully'});

})
.catch(() => {
  console.log("Deletion unsuccessful")
});


});


module.exports = app;
// XVQciUXUUFbHY4Qa
