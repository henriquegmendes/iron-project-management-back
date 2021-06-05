const Tasks = require('../models/Tasks');

class TasksController {
  constructor() {
    this.Tasks = Tasks;
  }

  createOne = async (req, res, next) => {
    try {
      const newTask = new this.Tasks(req.body);
  
      await newTask.save();
  
      res.status(201).json({ _id: newTask._id });
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new TasksController();
