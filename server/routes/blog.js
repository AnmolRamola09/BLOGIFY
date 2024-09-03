const { Router } = require("express");
const {
  uploadImage,
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blog-controller.js");

const router = Router();

router.get("/getAllBlogs", getAllBlogs);
router.post("/upload", uploadImage);
router.post("/create", createBlog);
router.get("/blog/:id", getBlog);
router.post("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

module.exports = router;
