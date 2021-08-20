//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Hello!! I am Dhruva, nice to meet you  so I am a computer science engineering student with specialisation in data science. You can say I am a geeky kid who loves to ramp up on and on about smartphones, laptops tablets and what not I can get my hands on. So I decided why not create a space where I can type away my geeks online and showcase it to the world 😉. So be-warned this blog will be like a sorta my journal with my tech thoughts and my normal thoughts all systematically pilled. And I would love to know what you think so don’t hesitate to shoot me a message."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true , useUnifiedTopology: true });
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });


});

app.get("/posts/:postId", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){

   res.render("post", {

     title: post.title,

     content: post.content

   });

 });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
