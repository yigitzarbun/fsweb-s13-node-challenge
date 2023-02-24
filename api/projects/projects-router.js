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

router.post("/", md.validateProjectDetails, (req, res) => {
  let project = {
    name: req.name,
    description: req.description,
    completed: req.completed,
  };
  projects.insert(project);
  res.status(200).json(project);
});

router.put(
  "/:id",
  md.validateProjectId,
  md.validateProjectDetails,
  async (req, res) => {
    let updatedProject = {
      name: req.name,
      description: req.description,
      completed: req.completed,
    };
    try {
      await projects.update(req.params.id, updatedProject);
      let updated = await projects.get(req.params.id);
      res.status(201).json(updated);
    } catch (error) {
      res.status(404).json(error);
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
