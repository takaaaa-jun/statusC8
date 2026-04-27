import { cookies } from "next/headers";

import { judgeAnswer } from "@/feature/game/engine/rules";
import {
  issueSignedGameSessionToken,
  readSignedGameSessionToken,
  SESSION_COOKIE_NAME,
  updateSignedGameSession,
} from "@/feature/game/state/session";
import type {
  AnswerRequestBody,
  AnswerResponse,
  PlayerAction,
} from "@/feature/game/types";

// action の文字列が許可値かを判定
function isPlayerAction(value: string): value is PlayerAction {
  return value === "advance" || value === "turn-back";
}

export async function GET() {
  // API の使い方を返すヘルスチェック用エンドポイント
  return Response.json({
    message: "Use POST /api/game/answer to submit answer",
  });
}

export async function POST(request: Request) {
  // cookie からセッションを特定
  const cookieStore = await cookies();
  const tokenFromCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!tokenFromCookie) {
    return Response.json({ message: "Session not found" }, { status: 400 });
  }

  // セッションを復元
  const session = readSignedGameSessionToken(tokenFromCookie);
  if (!session) {
    return Response.json(
      { message: "Session expired or invalid. Please start again." },
      { status: 400 },
    );
  }

  // 先に start を呼んでいない場合は回答できない
  if (!session.currentQuestion) {
    return Response.json(
      { message: "Current question not found. Call /api/game/start first." },
      { status: 400 },
    );
  }

  let body: AnswerRequestBody;

  try {
    // リクエストボディを JSON として取得
    body = (await request.json()) as AnswerRequestBody;
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  // action が許可値でなければ弾く
  if (!isPlayerAction(body.action)) {
    return Response.json({ message: "Invalid action" }, { status: 400 });
  }

  // 現在問題の異変有無とプレイヤー回答を判定
  const result = judgeAnswer({
    hasAnomaly: session.currentQuestion.hasAnomaly,
    action: body.action,
    currentCount: session.progressCount,
  });

  // 判定結果をセッションに反映（回答後は currentQuestion をクリア）
  const updatedSession = updateSignedGameSession(session, {
    progressCount: result.nextCount,
    usedQuestionIds: result.shouldResetQuestionPool
      ? []
      : session.usedQuestionIds,
    currentQuestion: null,
  });

  const signedToken = issueSignedGameSessionToken(updatedSession);
  cookieStore.set(SESSION_COOKIE_NAME, signedToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  // フロント向けの回答結果レスポンス
  const response: AnswerResponse = {
    isCorrect: result.isCorrect,
    isGameClear: result.isGameClear,
    progressCount: updatedSession.progressCount,
    shouldResetQuestionPool: result.shouldResetQuestionPool,
  };

  return Response.json(response);
}
