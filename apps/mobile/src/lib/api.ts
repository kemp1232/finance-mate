import { supabase } from "./supabase";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

if (!apiUrl) {
  throw new Error("Missing EXPO_PUBLIC_API_URL. Copy .env.example to .env and fill in the API URL.");
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  if (session?.access_token) {
    headers.set("Authorization", `Bearer ${session.access_token}`);
  }

  const response = await fetch(`${apiUrl}${path}`, { ...init, headers });

  if (response.status === 401) {
    await supabase.auth.signOut();
    throw new ApiError("Unauthorized", 401);
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(body?.error ?? "Something went wrong", response.status);
  }

  return body as T;
}
