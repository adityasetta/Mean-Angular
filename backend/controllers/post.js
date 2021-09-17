const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  console.log('entering multer');
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(result => {
    console.log('yellow');
    res.status(201).json({
      message: 'Post added!',
      post: {
        ...result, // get and copy all value from result
        id: result._id,
        // may also use these
        // title: result.title,
        // content: result.content,
        // imagePath: result.imagePath
      }
    });
  })
  .catch(err=>{
    res.status(500).json({
      message: "Create a post failed"
    })
  });
}

exports.getPosts = (req,res,next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if(pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then(documents=>{
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count=>{
      res.status(200).json({
        message: 'Posts Success!',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
}

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if(req.file){
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId },post).then(result => {
    //console.log(result);
    if( result.matchedCount > 0 ){
      res.status(200).json({message: "Post updated!"});
    }
    else{
      res.status(401).json({message: "Not Authorized"});
    }
  })
  .catch(error =>{
    res.status(500).json({
      message: "Couldn't update post"
    });
  });
}

exports.getPost = (req, res, next) =>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message:'Post not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    });
  });
}

exports.deletePost = (req,res,next)=>{
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).
    then(result => {
      //console.log(result); //this to check parameter to indicate success/failed
      if( result.deletedCount > 0 ){
        res.status(200).json({message: "Post deleted!"});
      }
      else{
        res.status(401).json({message: "Not Authorized"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Delete post failed!"
      });
    });
}
