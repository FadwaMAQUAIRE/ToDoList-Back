import { prisma } from "./src/db/client";

(async () => {
  await Promise.all([
    prisma.todo.create({
      data: {
        label: "Apprendre React",
      },
    }),
    prisma.todo.create({
      data: {
        label: "Apprendre TypeScript",
      },
    }),
    prisma.todo.create({
      data: {
        label: "Apprendre Node.js",
        done: true,
      },
    }),
    prisma.todo.create({
      data: {
        label: "Apprendre GraphQL",
      },
    }),
  ]);
})();
