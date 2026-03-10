import {
  createProfessor,
  deleteProfessor,
  getProfessorById,
  getProfessors,
  updateProfessor,
} from "#db/queries/professors";
import requireBody from "#middleware/requireBody";

import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const professors = await getProfessors();
  res.send(professors);
});

router.post(
  "/",
  requireBody(["name", "bio", "profileImage", "email", "phone", "department"]),
  async (req, res) => {
    const { name, bio, profileImage, email, phone, department } = req.body;
    const professor = await createProfessor({
      name,
      bio,
      profileImage,
      email,
      phone,
      department,
    });
    res.status(201).send(professor);
  },
);

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

router.delete("/:id", async (req, res) => {
  const professor = await deleteProfessor(req.professor.id);
  res.send(professor);
});

router.put(
  "/:id",
  requireBody(["name", "bio", "profileImage", "email", "phone", "department"]),
  async (req, res) => {
    const { name, bio, profileImage, email, phone, department } = req.body;
    const professor = await updateProfessor({
      id: req.professor.id,
      name,
      bio,
      profileImage,
      email,
      phone,
      department,
    });
    res.send(professor);
  },
);

router.get("/:id/department", (req, res) => {
  res.send(req.professor.department);
});
