const express = require ("express");
const multer = require ("multer");

//multer needs configuration it is used to get the incoming requests for images and other data
const Post = require ('../models/post');
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

//to configure how multer does store things
const storage = multer.diskStorage({
  //cb call back
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name+ '-'+ Date.now() +'.' +ext);
  }
});

router.post("", multer({storage: storage}).single("image"), (req, res, next)=>{
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    tittle: req.body.tittle,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename
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
  });

});

router.put("/:id",
  multer({ storage: storage}).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + '://' + req.get("host");
      imagePath = url + "/images/" + req.file.filename
    }
    const post = ({
    _id: req.body.id,
    tittle: req.body.tittle,
    content: req.body.content,
    imagePath: imagePath
  })
    console.log(post);
    Post.updateOne({_id: req.params.id}, post).then(result => {

    res.status(200).json({message: 'update successful'});
  });
});

router.get("", (req, res, next) => {
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
  });

});

 /*  const posts = [
    { id: 'qweqwheqlwkehq',
     tittle: 'first server-side post',
     content:'this is coming from the server'
    },
    { id: 'aafsdfsdf',
     tittle: 'second server-side post',
     content:'this is coming from the server#'
    },
    { id: 'gregfdggsad',
     tittle: 'third server-side post',
     content:'this is coming from the server!'
    }



  ]; */



router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'post not found'});
    }
  })
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result);
  res.status(200).json({message: "post deleted"});
});
});


module.exports = router;

