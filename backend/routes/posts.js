const express = require("express");


//multer needs configuration it is used to get the incoming requests for images and other data
const postController = require("../controllers/posts")
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const extractfile = require("../middleware/file");


router.post("",checkAuth, extractfile,postController.createPost);

router.put("/:id",checkAuth,extractfile,postController.updatePost);

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

router.delete("/:id",checkAuth, postController.deletePost );


module.exports = router;

