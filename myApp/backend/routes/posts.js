const express = require("express");
const Post = require('../model/post')

const routes = express.Router();


// POST REQUEST

routes.post('/addPosts', (req, res, next) => {

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

// GET 1 REQUEST

routes.get('/getPostById/:pid',(req, res, next) => {


Post.findById(req.params.pid)
.then((post) => {
console.log(" single get post");
  if (post) {
    res.status(200).json({ message : 'Post fetched successfully', post: post});
  }else {
    res.status(200).json({ message : 'No post found', post: null});
  }

})
.catch(() => {
  console.log("Error in getting posts");
});

});

// GET ALL REQUEST

routes.get('/getPosts',(req, res, next) => {

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

routes.delete("/deletePost/:id", (req, res, next) => {

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

// UPDATE REQUEST

routes.put("/updatePosts/:postId", (req, res, next) => {

  const post = new Post ({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })

  Post.updateOne( {_id: req.body.id}, post )
  .then((result) => {
    console.log(result);
    res.status(200).json({ message : 'Post updated successfully'});
  })

});

module.exports = routes;
