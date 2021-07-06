const Post = require ('../models/post');
exports.createPost = (req, res, next)=>{
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
  tittle: req.body.tittle,
  content: req.body.content,
  imagePath: url + "/images/" + req.file.filename,
   creator: req.userData.userId
});
post.save().then(createdPost => {
  res.status(201).json({
    message:"Post added successfully",
    post: {
      ...createdPost,
      id: createdPost._id,
     /*  tittle: createdPost.tittle,
      content: createdPost.content,
      imagePath: createdPost.imagePath */
    }
  });
})
.catch(error => {
  res.status(500).json({
    message: "Creating a post failed"
  });
});

};

exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const post = new Post({
  _id: req.body.id,
  tittle: req.body.tittle,
  content: req.body.content,
  imagePath: imagePath,
  creator: req.userData.userId
});
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
    if(result.n > 0){
      res.status(200).json({message: 'update successful'});
    } else {
      res.status(401).json({message: 'Not authorized'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "couldnt update post"
    });
  });
};

exports.getPosts = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  // for extremely large databases this if function will allow multiple number of files(narrow down the number of documents) with pagination
  if(pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery.then(documents=> {
    fetchedPosts = documents;
    return Post.count();
  })
  .then(count => {
     res.status(200).json({
        message:'Post fetched succesfully',
        posts: fetchedPosts,
        maxPosts: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "fetching post failed"
    });
  });

};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'post not found'});
    }
  })
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result =>{
    console.log(result);
    if(result.n > 0){
      res.status(200).json({message: 'Deletion successful'});
    } else {
      res.status(401).json({message: 'Not authorized'});
    }
})
.catch(error => {
  res.status(500).json({
    message: "fetching post failed"
  });
});
};

