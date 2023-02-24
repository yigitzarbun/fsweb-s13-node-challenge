const express = require("express");
const router = express.Router();
const actions = require("./actions-model");
const mdA = require("./actions-middlware");
const mdP = require("./../projects/projects-middleware");

router.get("/", (req, res) => {
  actions
    .get()
    .then((actions) => res.status(200).json(actions))
    .catch((err) => res.status(500).json({ message: "hata oluştu" }));
});

router.get("/:id", mdA.validateActionId, (req, res) => {
  /*actions
    .get(req.params.id)
    .then((action) => res.status(200).json(action))
    .catch((err) => res.status(500).json({ message: "hata" }));*/
  res.status(200).json(req.action);
});

router.post(
  "/",
  mdA.validateActionContent,
  mdP.validateProjectId,
  (req, res) => {
    actions
      .insert(req.action)
      .then((action) => res.json(action))
      .catch((err) => res.json(err));
  }
);

router.put(
  "/:id",
  mdA.validateActionId,
  mdA.validateActionContent,
  (req, res) => {
    actions
      .update(req.params.id, req.action)
      .then((updatedAction) => {
        res.status(200).json(updatedAction);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

router.delete("/:id", mdA.validateActionId, (req, res) => {
  actions
    .remove(req.params.id)
    .then(() => {
      res.status(200).json();
    })
    .catch(() => {});
});
module.exports = router;
