const express = require("express");
const router = express.Router();
const projects = require("./projects-model");
const md = require("./projects-middleware");

router.get("/", (req, res) => {
  projects
    .get()
    .then((projects) => res.status(200).json(projects))
    .catch((err) => res.status(500).json({ message: "hata oluştu" }));
});

router.get("/:id", md.validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post("/", md.validateProjectDetails, async (req, res, next) => {
  try {
    let { name, description, completed } = req;
    let project = {
      name: name,
      description: description,
      completed: completed,
    };
    let createdProject = await projects.insert(project);
    res.json(createdProject);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  md.validateProjectId,
  md.validateProjectDetails,
  async (req, res, next) => {
    try {
      let updatedData = await projects.update(req.params.id, {
        name: req.name,
        description: req.description,
        completed: req.completed,
      });
      res.json(updatedData);
    } catch (error) {
      next();
    }
  }
);

router.delete("/:id", md.validateProjectId, async (req, res) => {
  try {
    await projects.remove(req.params.id);
    res.status(200).json();
  } catch (error) {
    res.json(error);
  }
});

router.get("/:id/actions", md.validateProjectId, async (req, res) => {
  try {
    const projectActions = await projects.getProjectActions(req.params.id);
    res.json(projectActions);
  } catch (error) {}
});
module.exports = router;
