import { cookies } from "next/headers";

import { pickNextQuestion } from "@/feature/game/engine/random";
import {
  createInitialSignedGameSession,
  getSignedSessionId,
  issueSignedGameSessionToken,
  readSignedGameSessionToken,
  SESSION_COOKIE_NAME,
  updateSignedGameSession,
} from "@/feature/game/state/session";
import type { StartGameResponse } from "@/feature/game/types";

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
  const tokenFromCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (shouldReset) {
    cookieStore.delete(SESSION_COOKIE_NAME);

    return Response.json({
      ok: true,
      message: "Session has been reset",
    });
  }

  const session =
    readSignedGameSessionToken(tokenFromCookie) ?? createInitialSignedGameSession();

  // 未使用問題を優先して次の問題を抽選
  const nextQuestion = pickNextQuestion(session.usedQuestionIds);

  // 抽選結果をセッションに保存し、現在問題を更新
  const updatedSession = updateSignedGameSession(session, {
    usedQuestionIds: nextQuestion.nextUsedQuestionIds,
    currentQuestion: {
      questionId: nextQuestion.questionId,
      variant: nextQuestion.variant,
      hasAnomaly: nextQuestion.hasAnomaly,
    },
  });

  const signedToken = issueSignedGameSessionToken(updatedSession);

  // 次回アクセス用に署名付きトークンを cookie に保存
  cookieStore.set(SESSION_COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  // フロント向けの開始レスポンスを組み立て
  const response: StartGameResponse = {
    sessionId: getSignedSessionId(signedToken),
    questionId: nextQuestion.questionId,
    variant: nextQuestion.variant,
    usedQuestionIds: updatedSession.usedQuestionIds,
    progressCount: updatedSession.progressCount,
    didReset: nextQuestion.didReset,
  };

  return Response.json(response);
}
