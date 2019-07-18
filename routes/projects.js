const { Project, validate } = require("../models/Project");

module.exports = app => {
  app.post("/projects/:id", async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Check if this project already exisits
    let project = await Project.findOne({ title: req.body.title });
    if (project) {
      return res.status(400).send("That project already exisits!");
    } else {
      // Insert the new project if they do not exist yet
      project = new Project({
        author: req.params.id,
        title: req.body.title
      });
      await project.save();
      res.send(project);
    }
  });

  app.get("/projects/:id", async (req, res) => {
    let projects = await Project.find({ author: req.params.id });
    res.send(projects);
  });

  app.delete("/project", async (req, res) => {
    let projects = await Project.deleteOne({ title: req.body.title });
    res.send(projects);
  });

  app.post("/project/todo", async (req, res) => {
    let projects = await Project.findOneAndUpdate(
      { title: req.body.title },
      { $push: { todos: { todo: req.body.todo } } }
    );
    res.send(projects);
  });
  app.delete("/project/todo", async (req, res) => {
    let projects = await Project.findOneAndUpdate(
      { title: req.body.title, "todos.todo": req.body.todoId.todo },
      { $set: { "todos.$.done": true } }
    );
    res.send(projects);
  });
};
