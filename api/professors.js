import { getProfessors } from "#db/queries/professors";
import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const professors = await getProfessors();
  res.send(professors);
});
