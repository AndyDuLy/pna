const { v4 : uuidv4 } = require('uuid');
const User = require("../models/user");


const CREATE = async (req, res) => {
  try {
    const { title, content, category, categoryColor, userID } = req.body;

    const query = { _id : userID };
    const uuid = uuidv4();
    
    const updateDocument = {
      $push: {
        todos: {
          id : uuid,
          title : title,
          content : content,
          category : category,
          colorCode: categoryColor,
        }
      }
    };
  
    await User.updateOne(query, updateDocument);
  
    res.status(201).send({
      message: "Todo Created Successfully",
      objectID: uuid,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


const READ = async (req, res) => {
  try {
    const userID = req.query;

    await User.findOne({ _id : userID.userid }).then((currentUser) => {
      res.status(200).json(currentUser.todos);
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


const UPDATE = async (req, res) => {
  try {
    const { title, content, category, todoID, userID } = req.body;

    const query = { _id : userID, "todos.id" : todoID };

    const updateDocument = { 
      $set: {
        "todos.$.title" : title,
        "todos.$.content" : content,
        "todos.$.category" : category,
      }
    };

    await User.updateOne(query, updateDocument);

    res.status(201).send({
      message: "Todo updated successfully"
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


const DELETE = async (req, res) => {
  try {
    const { todoID, userID } = req.body;

    const query = { _id : userID, "todos.id" : todoID };

    const updateDocument = { 
      $pull: {
        todos: {
          id : todoID
        }
      }
    };

    await User.updateOne(query, updateDocument);

    res.status(201).send({
      message: "Todo deleted successfully"
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

module.exports = { CREATE, READ, UPDATE, DELETE };
