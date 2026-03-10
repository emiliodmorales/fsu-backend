import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  getDepartments,
  updateDepartment,
} from "#db/queries/departments";
import requireAdmin from "#middleware/requireAdmin";
import requireBody from "#middleware/requireBody";

import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});

router.post(
  "/",
  requireAdmin,
  requireBody(["name", "description", "images", "email", "phone"]),
  async (req, res) => {
    const { name, description, images, email, phone } = req.body;
    const department = await createDepartment({
      name,
      description,
      images,
      email,
      phone,
    });
    res.status(201).send(department);
  },
);

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

router.delete("/:id", requireAdmin, async (req, res) => {
  const department = await deleteDepartment(req.department.id);
  res.send(department);
});

router.put(
  "/:id",
  requireAdmin,
  requireBody(["name", "description", "images", "email", "phone"]),
  async (req, res) => {
    const { name, description, images, email, phone } = req.body;
    const department = await updateDepartment({
      id: req.department.id,
      name,
      description,
      images,
      email,
      phone,
    });
    res.send(department);
  },
);

router.get("/:id/professors", (req, res) => {
  res.send(req.department.professors);
});
