import { beforeEach, describe, expect, it, vi } from "vitest";

type FakeUser = { id: string; email: string; createdAt: Date };

const usersById = new Map<string, FakeUser>();
const tokenToAuthUser: Record<string, { id: string; email: string }> = {
  "token-user-a": { id: "user-a", email: "user-a@example.com" },
  "token-user-b": { id: "user-b", email: "user-b@example.com" },
};

vi.mock("../src/lib/supabase", () => ({
  supabaseAdmin: {
    auth: {
      getUser: vi.fn(async (token: string) => {
        const user = tokenToAuthUser[token];
        if (!user) {
          return { data: { user: null }, error: { message: "invalid token" } };
        }
        return { data: { user }, error: null };
      }),
    },
  },
}));

vi.mock("../src/lib/prisma", () => ({
  prisma: {
    user: {
      upsert: vi.fn(async ({ where, create }: any) => {
        const existing = usersById.get(where.id);
        const record: FakeUser = existing ?? { ...create, createdAt: new Date() };
        usersById.set(where.id, record);
        return record;
      }),
      findUnique: vi.fn(async ({ where }: any) => usersById.get(where.id) ?? null),
    },
  },
}));

const { createApp } = await import("../src/app");

describe("GET /health", () => {
  it("returns ok without authentication", async () => {
    const app = createApp();
    const res = await app.request("/health");

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ data: { status: "ok" } });
  });
});

describe("GET /me", () => {
  beforeEach(() => {
    usersById.clear();
  });

  it("rejects requests without a token", async () => {
    const app = createApp();
    const res = await app.request("/me");

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("rejects requests with an invalid token", async () => {
    const app = createApp();
    const res = await app.request("/me", {
      headers: { Authorization: "Bearer not-a-real-token" },
    });

    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "Unauthorized" });
  });

  it("returns the authenticated user's own info with a valid token", async () => {
    const app = createApp();
    const res = await app.request("/me", {
      headers: { Authorization: "Bearer token-user-a" },
    });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.data.id).toBe("user-a");
    expect(body.data.email).toBe("user-a@example.com");
  });

  it("isolates users: user B's token never returns user A's data", async () => {
    const app = createApp();

    const resA = await app.request("/me", {
      headers: { Authorization: "Bearer token-user-a" },
    });
    const bodyA = await resA.json();

    const resB = await app.request("/me", {
      headers: { Authorization: "Bearer token-user-b" },
    });
    const bodyB = await resB.json();

    expect(bodyA.data.id).toBe("user-a");
    expect(bodyB.data.id).toBe("user-b");
    expect(bodyB.data.id).not.toBe(bodyA.data.id);
    expect(bodyB.data.email).not.toBe(bodyA.data.email);
  });
});
