const Joi = require("joi");
const mongoose = require("mongoose");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 255,
      unique: true
    },
    todos: [
      {
        todo: {
          type: String,
          minlength: 4,
          maxlength: 1024
        },
        done: {
          type: Boolean,
          default: false
        }
      }
    ]
  })
);

function validateProject(project) {
  const schema = {
    title: Joi.string()
      .min(4)
      .max(50)
      .required()
  };
  return Joi.validate(project, schema);
}

exports.Project = Project;
exports.validate = validateProject;
