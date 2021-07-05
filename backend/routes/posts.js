const express = require("express");
const multer = require("multer");

//multer needs configuration it is used to get the incoming requests for images and other data
const postController = require("../controllers/posts")
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

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

router.post("",
checkAuth,
  multer({storage: storage}).single("image"),
   postController.createPost);

router.put("/:id",
checkAuth,
  multer({ storage: storage}).single("image"),
  postController.updatePost);

router.get("", postController.getPosts);

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



router.get("/:id", postController.getPost);

router.delete("/:id",checkAuth, postController.deletePost);


module.exports = router;

