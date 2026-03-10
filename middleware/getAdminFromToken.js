import { getAdminById } from "#db/queries/admins";
import { verifyToken } from "#utils/jwt";

/** Attaches the admin to the request if a valid token is provided */
export default async function getAdminFromToken(req, res, next) {
  const authorization = req.get("authorization");
  if (!authorization || !authorization.startsWith("Bearer ")) return next();

  const token = authorization.split(" ")[1];
  try {
    const { id } = verifyToken(token);
    const admin = await getAdminById(id);
    req.admin = admin;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send("Invalid token.");
  }
}
