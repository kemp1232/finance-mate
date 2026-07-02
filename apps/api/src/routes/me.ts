import { Hono } from "hono";
import { requireAuth, type AuthedVariables } from "../middleware/require-auth";
import { prisma } from "../lib/prisma";

export const meRoute = new Hono<{ Variables: AuthedVariables }>();

meRoute.get("/", requireAuth, async (c) => {
  const userId = c.get("userId");

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({
    data: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    },
  });
});
