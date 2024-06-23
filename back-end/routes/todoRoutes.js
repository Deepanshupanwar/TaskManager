const express = require("express");
const {
  addTodo,
  editTodo,
  deleteTodo,
  getTodo
} = require("../controllers/todoController");

const router = express.Router();

router.post("/addTodo", addTodo);

router.delete("/deleteTodo", deleteTodo);

router.put("/editTodo", editTodo);

router.get("/getTodo/:id",getTodo);

module.exports = router;