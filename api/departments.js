import { getDepartments } from "#db/queries/departments";
import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});
