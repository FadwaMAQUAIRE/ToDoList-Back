import { OpenAPIHono } from "@hono/zod-openapi";
import { todo } from "./features/todo/todo.controller";

const router = new OpenAPIHono();

router.route("/", todo);

export default router;
