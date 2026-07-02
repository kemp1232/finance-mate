import { Hono } from "hono";
import { healthRoute } from "./routes/health";
import { meRoute } from "./routes/me";

export function createApp() {
  const app = new Hono();

  app.route("/health", healthRoute);
  app.route("/me", meRoute);

  app.notFound((c) => c.json({ error: "Not found" }, 404));

  app.onError((error, c) => {
    console.error(error);
    return c.json({ error: "Something went wrong" }, 500);
  });

  return app;
}
