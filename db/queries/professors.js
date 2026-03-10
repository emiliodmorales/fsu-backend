import db from "#db/client";

/**
 * A professor at fullstack university
 * @typedef {Object} Professor
 * @property {string} name - The name of the professor
 * @property {stirng} bio - A description of the professor
 * @property {string} images - Path to professor's picture
 * @property {string} email - The professor's email address
 * @property {string} phone - The professor's phone number
 */
/**
 * Create a new professor
 * @param {Professor} professor - The professor to add to the database
 * @returns the newly created professor
 */
export async function createProfessor({
  name,
  bio,
  profileImage,
  email,
  phone,
  department,
}) {
  const sql = `
    INSERT INTO professors
      (name, bio, profile_image, email, phone, department)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [name, bio, profileImage, email, phone, department]);
  return professor;
}

export async function getProfessors() {
  const sql = `
    SELECT id, name FROM professors
  `;
  const { rows: professors } = await db.query(sql);
  return professors;
}

export async function getProfessorById(id) {
  const sql = `
    SELECT
      professors.*,
      (
        SELECT to_json(departments)
        FROM departments
        WHERE departments.id = professors.department
      ) AS department
    FROM professors
    WHERE professors.id=$1
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [id]);
  return professor;
}

export async function deleteProfessor(id) {
  const sql = `
    DELETE FROM professors
    WHERE id=$1
    RETURNING *
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [id]);
  return professor;
}

export async function updateProfessor({
  id,
  name,
  bio,
  profileImage,
  email,
  phone,
  department,
}) {
  const sql = `
    UPDATE professors
    SET
      name=$2,
      bio=$3,
      profile_image=$4,
      email=$5,
      phone=$6,
      department=$7
    WHERE id=$1
    RETURNING *
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [
    id,
    name,
    bio,
    profileImage,
    email,
    phone,
    department,
  ]);
  return professor;
}
