import db from "#db/client";

/**
 * A department of fullstack university
 * @typedef {Object} Department
 * @property {string} name - The name of the department
 * @property {stirng} description - A description of the department
 * @property {string[]} images - An array of paths to department images
 * @property {string} email - The department email address
 * @property {string} phone - The department phone number
 */
/**
 * Create a new department
 * @param {Department} department - The department to add to the database
 * @returns the newly created department
 */
export async function createDepartment({
  name,
  description,
  images,
  email,
  phone,
}) {
  const sql = `
    INSERT INTO departments
      (name, description, images, email, phone)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const {
    rows: [department],
  } = await db.query(sql, [name, description, images, email, phone]);
  return department;
}

export async function getDepartments() {
  const sql = `
    SELECT id, name FROM departments
  `;
  const { rows: departments } = await db.query(sql);
  return departments;
}
