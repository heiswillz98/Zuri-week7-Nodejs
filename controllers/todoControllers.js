require("../models/database");
const Todo = require("../models/todo");
const { json } = require("express");

/* 
 *Get /
 *Homepage
*/
// to show all todo tasks on a page
exports.todo = async(req, res) => {
    try {
        const task = await Todo.find({});
        res.send(task);
    } catch (err) {
        res.json({message : err});
    }
}

//insert dummy data

// async function insertDummyData() {
//     try {
//         Todo.insertMany([
//             {
//                 title: "Work",
//                 description: "Sign the papers"
//             },
//             {
//                 title: "Home",
//                 description: "Cut the grass"
//             },
//             {
//                 title: "School",
//                 description: "Clear the timetable"
//             },
//         ])
//     } catch (error) {
//         console.log();
//     }
// }
// insertDummyData();

/**
 * Post /
 * Homepage
 */
exports.addTodo = async (req,res) => {
 
    try{
      //create a new todo task
      const {title, description} = await req.body;
      const task = new Todo({
        title: title,
        description: description
      });

      //save task
      await task.save();
      return res.status(200).json({message :'Successful'});
    } catch(err){
      res.status(500).json({message :err});
      res.status(404).json({message :err});
    }
}

/**
 * Update /:id
 */
exports.updateById = async(req,res) => {
    try{
        //get id
        const taskId = await req.params.id;
        //get changes
        const {title, description} = await req.body;
        //find id in database
        Todo.findOneAndUpdate({_id: taskId}, {$set: {title: title, description: description}}, (err)=>{
          if(err){
            res.send(err);
          }
        });
        
        return res.status(200).json({message: "Successful"});
    } catch(err){
      res.status(500).json({message :err});
      res.status(404).json({message :err})
    }
}

/**
 * Delete /:id
 */
exports.deleteById = async(req,res) => {
  try{
      //get id
      const taskId = await req.params.id;
      
      await Todo.deleteOne({_id: taskId});
      
      return res.status(200).json({message: "Successful"});
  } catch(err){
    res.status(500).json({message :err});
    res.status(404).json({message :err})
  }
}