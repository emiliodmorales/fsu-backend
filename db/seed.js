import db from "#db/client";
import { createDepartment } from "#db/queries/departments";
import { createProfessor } from "#db/queries/professors";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const math = await createDepartment({
    name: "Math",
    description: "We love numbers",
    images: [
      "https://img.freepik.com/free-photo/blackboard-inscribed-with-scientific-formulas-calculations_1150-19413.jpg?semt=ais_hybrid&w=740&q=80",
    ],
    email: "math@fsu.edu",
    phone: "(161)654-5654",
  });

  const bill = await createProfessor({
    name: "Bill",
    bio: "I like math",
    profileImage: "https://www.bard.edu/files/programs/image.php?id=3200091",
    email: "bill@fsu.edu",
    phone: "(243)198-1448",
    department: math.id,
  });

  const dean = await createUser("dean", "password123");
}
