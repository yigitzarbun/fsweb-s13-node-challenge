const projects = require("./projects-model");

async function validateProjectId(req, res, next) {
  let { id } = req.params;
  try {
    let selectedProject = await projects.get(id);
    if (!selectedProject) {
      res.status(404).json({ message: "böyle bir proje yok" });
    } else {
      req.project = selectedProject;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: "hata oluştu" });
  }
}

function validateProjectDetails(req, res, next) {
  let { name, description, completed } = req.body;
  if (name && description) {
    req.name = name;
    req.description = description;
    req.completed = completed;
    next();
  } else {
    res.status(400).json({ message: "gerekli bilgiler eksik" });
  }
}

module.exports = { validateProjectId, validateProjectDetails };
