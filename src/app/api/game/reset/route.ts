import { cookies } from "next/headers";

import { removeGameSession } from "@/feature/game/state/session";

const SESSION_COOKIE_NAME = "game_session_id";

export async function GET() {
  return Response.json({
    message: "Use POST /api/game/reset to reset game session",
  });
}

export async function POST() {
  const cookieStore = await cookies();
  const sessionIdFromCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (sessionIdFromCookie) {
    removeGameSession(sessionIdFromCookie);
  }

  cookieStore.delete(SESSION_COOKIE_NAME);

  return Response.json({
    ok: true,
    message: "Session has been reset",
  });
}
