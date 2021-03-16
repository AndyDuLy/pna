const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require("mongoose");
require("dotenv").config();


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

  
const PORT = process.env.PORT || 5000;

// Routes
const routes = require('./routes/index');

const app = express();
app.use(cors({ exposedHeaders: 'x-token' }));
app.use(express.json());

app.use(routes);
app.use('/', (req, res) => {
  res.send("<div> Default endpoint </div>");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
