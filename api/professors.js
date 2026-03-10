import { getProfessorById, getProfessors } from "#db/queries/professors";
import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const professors = await getProfessors();
  res.send(professors);
});

router.param("id", async (req, res, next) => {
  const { id } = req.params;

  const professor = await getProfessorById(id);
  if (!professor) return res.status(400).send("Invalid professor id.");

  req.professor = professor;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.professor);
});

router.get("/:id/department", (req, res) => {
  res.send(req.professor.department);
});
