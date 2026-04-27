import { cookies } from "next/headers";

import { pickNextQuestion } from "@/feature/game/engine/random";
import {
  getOrCreateGameSession,
  patchGameSession,
  removeGameSession,
} from "@/feature/game/state/session";
import type { StartGameResponse } from "@/feature/game/types";

const SESSION_COOKIE_NAME = "game_session_id";

export async function GET() {
  // API の使い方を返すヘルスチェック用エンドポイント
  return Response.json({
    message: "Use POST /api/game/start to select next question",
  });
}

export async function POST(request: Request) {
  // cookie から既存セッションを復元（なければ新規作成）
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const shouldReset = searchParams.get("reset") === "1";
  const sessionIdFromCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (shouldReset) {
    if (sessionIdFromCookie) {
      removeGameSession(sessionIdFromCookie);
    }

    cookieStore.delete(SESSION_COOKIE_NAME);

    return Response.json({
      ok: true,
      message: "Session has been reset",
    });
  }

  const session = getOrCreateGameSession(sessionIdFromCookie);

  // 未使用問題を優先して次の問題を抽選
  const nextQuestion = pickNextQuestion(session.usedQuestionIds);

  // 抽選結果をセッションに保存し、現在問題を更新
  const updatedSession = patchGameSession(session.sessionId, {
    usedQuestionIds: nextQuestion.nextUsedQuestionIds,
    currentQuestion: {
      questionId: nextQuestion.questionId,
      variant: nextQuestion.variant,
      hasAnomaly: nextQuestion.hasAnomaly,
    },
  });

  // 次回アクセス用に sessionId を cookie に保存
  cookieStore.set(SESSION_COOKIE_NAME, updatedSession.sessionId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  // フロント向けの開始レスポンスを組み立て
  const response: StartGameResponse = {
    sessionId: updatedSession.sessionId,
    questionId: nextQuestion.questionId,
    variant: nextQuestion.variant,
    usedQuestionIds: updatedSession.usedQuestionIds,
    progressCount: updatedSession.progressCount,
    didReset: nextQuestion.didReset,
  };

  return Response.json(response);
}
