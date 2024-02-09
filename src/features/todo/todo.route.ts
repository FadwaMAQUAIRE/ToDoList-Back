import { todoSchema } from "./todo.schema";
import { createRoute, z } from "@hono/zod-openapi";

const basePath = "/api/todos";

const entitySchema = todoSchema;
const validationSchema = todoSchema.omit({ id: true });

export default {
  getAll: createRoute({
    method: "get",
    path: basePath,
    request: {
      query: z.object({
        take: z.string().transform(Number).optional(),
        skip: z.string().transform(Number).optional(),
        q: z.string().optional(),
      }),
    },
    responses: {
      200: {
        description: "Return a list",
        content: {
          "application/json": {
            schema: z.array(entitySchema),
          },
        },
      },
    },
  }),
  getOne: createRoute({
    method: "get",
    path: `${basePath}/{id}`,
    request: {
      params: z.object({
        id: z.string().transform(Number),
      }),
    },
    responses: {
      200: {
        description: "Return one",
        content: {
          "application/json": {
            schema: entitySchema,
          },
        },
      },
      404: {
        description: "Not found",
      },
    },
  }),
  create: createRoute({
    method: "post",
    path: basePath,
    request: {
      body: {
        content: {
          "application/json": {
            schema: validationSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Return one",
        content: {
          "application/json": {
            schema: entitySchema,
          },
        },
      },
    },
  }),
  update: createRoute({
    method: "patch",
    path: `${basePath}/{id}`,
    request: {
      params: z.object({
        id: z.string().transform(Number),
      }),
      body: {
        content: {
          "application/json": {
            schema: validationSchema.partial(),
          },
        },
      },
    },
    responses: {
      200: {
        description: "Return one",
        content: {
          "application/json": {
            schema: entitySchema,
          },
        },
      },
      404: {
        description: "Not found",
      },
    },
  }),
  delete: createRoute({
    method: "delete",
    path: `${basePath}/{id}`,
    request: {
      params: z.object({
        id: z.string().transform(Number),
      }),
    },
    responses: {
      200: {
        description: "Return one",
        content: {
          "application/json": {
            schema: entitySchema,
          },
        },
      },
      404: {
        description: "Not found",
      },
    },
  }),
};
