import type { Context, Next } from "hono";
import { supabaseAdmin } from "../lib/supabase";
import { prisma } from "../lib/prisma";

export type AuthedVariables = {
  userId: string;
  userEmail: string;
};

export async function requireAuth(c: Context<{ Variables: AuthedVariables }>, next: Next) {
  const authHeader = c.req.header("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;

  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user || !data.user.email) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { id, email } = data.user;

  // Keep the local User row (used for foreign keys) in sync with Supabase Auth.
  await prisma.user.upsert({
    where: { id },
    update: { email },
    create: { id, email },
  });

  c.set("userId", id);
  c.set("userEmail", email);

  await next();
}
