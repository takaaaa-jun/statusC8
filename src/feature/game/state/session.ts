import type { GameSession } from "../types";

// メモリ上の簡易セッションストア
// key: sessionId / value: ゲームの進行状態
const gameSessions = new Map<string, GameSession>();

// 新しいセッションIDを発行
function createSessionId() {
  return crypto.randomUUID();
}

// 新規セッションの初期状態を作成
function createEmptySession(sessionId: string): GameSession {
  return {
    sessionId,
    progressCount: 0, // 連続正解数(cnt)
    usedQuestionIds: [], // 使用済み問題ID
    currentQuestion: null, // 現在表示中の問題
  };
}

// 既存セッションを取得。なければ新規作成して返す
export function getOrCreateGameSession(sessionIdFromCookie?: string | null) {
  if (sessionIdFromCookie) {
    const existingSession = gameSessions.get(sessionIdFromCookie);
    if (existingSession) {
      return existingSession;
    }
  }

  const sessionId = createSessionId();
  const newSession = createEmptySession(sessionId);
  gameSessions.set(sessionId, newSession);
  return newSession;
}

// セッションの一部だけ更新する
// 例: 問題の進行や現在問題を更新
export function patchGameSession(
  sessionId: string,
  patch: Partial<
    Pick<GameSession, "usedQuestionIds" | "currentQuestion" | "progressCount">
  >,
) {
  const currentSession = gameSessions.get(sessionId);
  if (!currentSession) {
    throw new Error("Game session not found");
  }

  // 既存値に patch を上書きして新しい状態を作る
  const updatedSession: GameSession = {
    ...currentSession,
    ...patch,
  };

  gameSessions.set(sessionId, updatedSession);
  return updatedSession;
}

// セッションを削除して初期化する
export function removeGameSession(sessionId: string) {
  gameSessions.delete(sessionId);
}
