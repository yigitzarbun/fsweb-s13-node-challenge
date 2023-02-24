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
  let { name, description } = req.body;
  if (!name || !description) {
    res.status(400).json({ message: "gerekli bilgiler eksik" });
  } else {
    req.name = name;
    req.description = description;
  }
  next();
}

module.exports = { validateProjectId, validateProjectDetails };
