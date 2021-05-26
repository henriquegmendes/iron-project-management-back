const Projects = require('../models/Projects');

class ProjectsController {
  constructor() {
    this.Projects = Projects;
  }

  getMany = async (req, res, next) => {
    try {
      const projects = await this.Projects.find({ user: req.user.id });

      res.status(200).json(projects);
    } catch (error) {
      console.log(error);
    }
  }

  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;

      const project = await this.Projects.findById(id);

      if (project === null) {
        res.status(404).json({ message: `Project with id ${id} not found` });
        return;
      }

      res.status(200).json(project);
    } catch (error) {
      console.log(error);
    }
  }

  createOne = async (req, res, next) => {
    try {
      const newProject = new this.Projects({ ...req.body, user: req.user.id });

      await newProject.save();

      res.status(201).json({ _id: newProject._id });
    } catch (error) {
      console.log(error);
    }
  }

  updateOne = async (req, res, next) => {
    try {
      const { params: { id }, body } = req;

      await this.Projects.findByIdAndUpdate(id, body);

      res.status(200).json({ message: `Project with ID ${id} updated` });
    } catch (error) {
      console.log(error);
    }
  }

  deleteOne = async (req, res, next) => {
    try {
      res.status(200).json({ message: 'DELETE ONE PROJECT!!!' });
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = new ProjectsController();
