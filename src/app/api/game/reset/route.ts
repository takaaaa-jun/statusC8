import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/feature/game/state/session";

export async function GET() {
  return Response.json({
    message: "Use POST /api/game/reset to reset game session",
  });
}

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);

  return Response.json({
    ok: true,
    message: "Session has been reset",
  });
}
