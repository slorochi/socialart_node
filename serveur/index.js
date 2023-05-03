const express = require('express')
const app = express();
const port = process.env.PORT | 3001;
const cors = require('cors');
const db = require('./models')

app.use(express.json());
app.use(cors());

// Routers
const usersApi = require("./routes/Users");
const postsApi = require("./routes/Posts");
const commentsApi = require("./routes/Comments");
const filesApi = require("./routes/Files");

app.use("/users",usersApi);
app.use("/posts",postsApi);
app.use("/comments",commentsApi);
app.use("/files",filesApi);


db.sequelize.sync().then(()=>{
    app.listen(port, ()=>{console.log("Server listening on " + port)})
})
