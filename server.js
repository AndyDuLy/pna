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

  
const PORT = process.env.PORT || 80;

// Routes
/* const whitelist = [
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },

  credentials: true,
};
 */
const routes = require('./routes/index');

const app = express();

app.use(express.json());
//app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());

app.all('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  
  if (req.method === 'OPTIONS') {
    res.header("Access-Contol-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }

  next();
});

app.use(routes);

app.use('/', (req, res) => {
  res.send("<div> Default endpoint </div>");
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
