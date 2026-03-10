import { Router } from "express";
const router = Router();
export default router;

import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import { createAdmin, getAdminByLogin } from "#db/queries/admins";

router.post(
  "/register",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const admin = await createAdmin(username, password);
    const token = await createToken({ id: admin.id });
    res.status(201).send(token);
  },
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const admin = await getAdminByLogin(username, password);
    if (!admin) return res.sendStatus(401);
    const token = await createToken({ id: admin.id });
    res.send(token);
  },
);
