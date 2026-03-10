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

export async function getDepartmentById(id) {
  const sql = `
    SELECT
      departments.*,
      (
        SELECT json_agg(professors)
        FROM professors
        WHERE departments.id = professors.department_id
      ) AS professors
    FROM departments
    WHERE departments.id=$1
  `;
  const {
    rows: [department],
  } = await db.query(sql, [id]);
  return department;
}

export async function deleteDepartment(id) {
  const sql = `
    DELETE FROM departments
    WHERE id=$1
    RETURNING *
  `;
  const {
    rows: [department],
  } = await db.query(sql, [id]);
  return department;
}

export async function updateDepartment({
  id,
  name,
  description,
  images,
  email,
  phone,
}) {
  const sql = `
    UPDATE departments
    SET
      name=$2,
      description=$3,
      images=$4,
      email=$5,
      phone=$6
    WHERE id=$1
    RETURNING *
  `;
  const {
    rows: [department],
  } = await db.query(sql, [id, name, description, images, email, phone]);
  return department;
}
