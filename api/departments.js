import { getDepartmentById, getDepartments } from "#db/queries/departments";
import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});

router.param("id", async (req, res, next) => {
  const { id } = req.params;

  const department = await getDepartmentById(id);
  if (!department) return res.status(400).send("Invalid department id.");

  req.department = department;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.department);
});

router.get("/:id/professors", (req, res) => {
  res.send(req.department.professors);
});
