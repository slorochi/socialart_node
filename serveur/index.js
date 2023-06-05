const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT | 3011;
const cors = require("cors");
const db = require("./models");
const cookieParser = require("cookie-parser");
const http = require("http");
const server = http.createServer(app);
const io = require("./utils/socket").initialize(server);

const HOST_CLIENT = process.env.HOST_CLIENT;
app.use("/uploads", express.static("uploads"));
console.log(HOST_CLIENT);
// ...
app.use(express.json());
app.use(
  cors({
    origin: [`*`, `http://${HOST_CLIENT}:3005`, `http://localhost:3005`],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(cookieParser());
// Routers
const usersApi = require("./routes/Users");
const postsApi = require("./routes/Posts");
const commentsApi = require("./routes/Comments");
const filesApi = require("./routes/Files");

app.use("/users", usersApi);
app.use("/posts", postsApi);
app.use("/comments", commentsApi);
app.use("/files", filesApi);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log("Server listening on " + port);
  });
});
