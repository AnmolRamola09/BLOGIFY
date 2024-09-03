const express = require("express");
const dotenv = require("dotenv");
const connection = require("./database/db.js");
const userRouter = require("./routes/user.js");
const blogRouter = require("./routes/blog.js");
const commentRouter = require("./routes/comment.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication.js");

dotenv.config();
const app = express();

app.use(cors({ credentials: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  if (
    req.path === "/login" ||
    req.path === "/signup" ||
    req.path === "/getAllBlogs" ||
    req.path.startsWith("/blog") ||
    req.path.startsWith("/comments") ||
    req.path === "/uploadAvatar"
  ) {
    return next(); // Skip the authentication check for login and signup routes
  }
  checkForAuthenticationCookie("token")(req, res, next);
});

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

app.use("/", userRouter);
app.use("/", blogRouter);
app.use("/", commentRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});

connection(process.env.DB_USERNAME, process.env.DB_PASSWORD);
