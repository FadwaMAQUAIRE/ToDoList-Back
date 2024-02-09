import { OpenAPIHono } from "@hono/zod-openapi";
import todoRoute from "./todo.route";
import { prisma } from "../../db/client";

export const todo = new OpenAPIHono();

todo.openapi(todoRoute.getAll, async (c) => {
  const { skip, take, q } = c.req.valid("query");
  const todos = await prisma.todo.findMany({
    skip,
    take,
    where: {
      label: {
        contains: q,
      },
    },
  });
  return c.json(todos);
});

todo.openapi(todoRoute.getOne, async (c) => {
  const { id } = c.req.valid("param");

  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  if (!todo) {
    return c.notFound();
  }
  return c.json(todo);
});

todo.openapi(todoRoute.create, async (c) => {
  const data = c.req.valid("json");
  const todos = await prisma.todo.create({
    data,
  });
  return c.json(todos);
});

todo.openapi(todoRoute.update, async (c) => {
  const data = c.req.valid("json");
  const { id } = c.req.valid("param");
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data,
  });
  if (!todo) {
    return c.notFound();
  }
  return c.json(todo);
});

todo.openapi(todoRoute.delete, async (c) => {
  const { id } = c.req.valid("param");
  const todo = await prisma.todo.delete({
    where: {
      id,
    },
  });
  if (!todo) {
    return c.notFound();
  }
  return c.json(todo);
});
