import { Router } from "express";
const router = Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createToken } from "#utils/jwt";
import { createUser, getUserByLogin } from "#db/queries/users";

router.post(
  "/register",
  requireUser,
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    const token = await createToken({ id: user.id });
    res.status(201).send(token);
  },
);

router.post(
  "/login",
  requireBody(["username", "password"]),
  async (req, res) => {
    const { username, password } = req.body;
    const user = await getUserByLogin(username, password);
    if (!user) return res.sendStatus(401);
    const token = await createToken({ id: user.id });
    res.send(token);
  },
);
