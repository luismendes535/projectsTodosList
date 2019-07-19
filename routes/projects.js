const { Project, validate } = require("../models/Project");
const { verifyToken } = require("./verifyToken");

module.exports = app => {
  app.post("/projects", verifyToken, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let project = await Project.findOne({ title: req.body.title });
    if (project) {
      return res.status(400).send("That project already exisits!");
    } else {
      project = new Project({
        author: req.user._id,
        title: req.body.title
      });
      await project.save();
      res.send(project);
    }
  });

  app.get("/projects", verifyToken, async (req, res) => {
    const projects = await Project.find({ author: req.user._id });
    res.send(projects);
  });

  app.delete("/project", verifyToken, async (req, res) => {
    const projects = await Project.deleteOne({ _id: req.body.projectId });
    res.send(projects);
  });

  app.post("/project/todo", verifyToken, async (req, res) => {
    const projects = await Project.findOneAndUpdate(
      { title: req.body.title },
      { $push: { todos: { todo: req.body.todo } } },
      { new: true }
    );
    res.send(projects);
  });

  app.put("/project/todo", verifyToken, async (req, res) => {
    const projects = await Project.findOneAndUpdate(
      { title: req.body.title, "todos.todo": req.body.todoId.todo },
      { $set: { "todos.$.finished": Date() } }
    );
    res.send(projects);
  });
};
