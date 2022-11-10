const express = require("express");
const router = express.Router();
const todoControllers = require("../controllers/todoControllers");


router.get("/", todoControllers.todo);
router.post("/", todoControllers.addTodo);
router.put("/:id", todoControllers.updateById);
router.delete("/:id", todoControllers.deleteById);


module.exports = router;