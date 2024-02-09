import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import router from "./router";

const app = new OpenAPIHono();

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
