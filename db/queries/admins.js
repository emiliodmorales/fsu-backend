import db from "#db/client";
import bcrypt from "bcrypt";

/**
 * Adds a new admin to the database
 * @param {string} username - The username for the admin
 * @param {string} password - The unencrypted password for the admin
 * @returns the newly created admin
 */
export async function createAdmin(username, password) {
  const sql = `
    INSERT INTO admins
      (username, password)
    VALUES
      ($1, $2)
    RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [admin],
  } = await db.query(sql, [username, hashedPassword]);
  return admin;
}

export async function getAdminById(id) {
  const sql = `
    SELECT * FROM admins
    WHERE id=$1
  `;
  const {
    rows: [admin],
  } = await db.query(sql, [id]);
  return admin;
}

export async function getAdminByLogin(username, password) {
  const sql = `
    SELECT * FROM admins
    WHERE username=$1
  `;
  const {
    rows: [admin],
  } = await db.query(sql, [username]);

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return null;

  return admin;
}
