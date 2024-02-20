import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import router from "./router";

const app = new OpenAPIHono();
app.use("*", cors());
app.route("/", router);

app.get("/ui", swaggerUI({ url: "/doc" }));
app.doc("/doc", {
  info: {
    title: "An API",
    version: "v1",
  },
  openapi: "3.1.0",
});

export default app;
