const actions = require("./actions-model");
const projects = require("./../projects/projects-model");

async function validateActionId(req, res, next) {
  try {
    const { id } = req.params;
    const action = await actions.get(id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: "yok ki böyle bir action" });
    }
  } catch (error) {
    res.status(500).json({ message: "hata oluştu" });
  }
}

async function validateActionContent(req, res, next) {
  const { project_id, description, notes, completed } = req.body;
  const project = await projects.get(project_id);
  const projectIdValid = project ? true : false;
  const newAction = {
    project_id: project_id,
    description: description,
    notes: notes,
    completed: completed,
  };
  if (project_id && description && notes && projectIdValid) {
    req.action = newAction;
    next();
  } else {
    res.status(400).json({ message: "gerekli bilgiler eksik veya hatalı" });
  }
}
module.exports = { validateActionId, validateActionContent };
