require("dotenv").config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require("mongoose");

const routes = require('./routes/index');


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

  
const PORT = process.env.PORT || 80;

const app = express();

app.use(express.json());

app.options('*', cors());

var corsOptions = {
  origin: "http://localhost:3000/login",
  credentials: true
};

app.use(cors(corsOptions));

app.use(routes);

app.use('/', (req, res) => {
  res.send("<div> Default endpoint </div>");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
