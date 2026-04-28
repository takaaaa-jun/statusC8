import { createHmac, timingSafeEqual } from "node:crypto";

import type { QuestionId, SelectedQuestion, Variant } from "../types";

const TOKEN_VERSION = 1;
const SESSION_TTL_SECONDS = 60 * 60 * 6;
const SESSION_COOKIE_SECRET = process.env.GAME_SESSION_SECRET;

if (!SESSION_COOKIE_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("GAME_SESSION_SECRET is required in production");
}

const SIGNING_SECRET = SESSION_COOKIE_SECRET ?? "dev-only-secret-change-this";

const QUESTION_IDS: QuestionId[] = [
  "q01",
  "q02",
  "q03",
  "q04",
  "q05",
  "q06",
  "q07",
  "q08",
];
const VARIANTS: Variant[] = ["normal", "anomaly-a", "anomaly-b"];

export const SESSION_COOKIE_NAME = "game_session_token";

export type SignedGameSession = {
  progressCount: number;
  usedQuestionIds: QuestionId[];
  currentQuestion: SelectedQuestion | null;
  version: number;
  issuedAt: number;
  expiresAt: number;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signPayload(payloadBase64: string) {
  return createHmac("sha256", SIGNING_SECRET)
    .update(payloadBase64)
    .digest("base64url");
}

function isQuestionId(value: string): value is QuestionId {
  return QUESTION_IDS.includes(value as QuestionId);
}

function isVariant(value: string): value is Variant {
  return VARIANTS.includes(value as Variant);
}

function isValidCurrentQuestion(
  value: unknown,
): value is SignedGameSession["currentQuestion"] {
  if (value === null) return true;
  if (typeof value !== "object" || value === null) return false;

  const current = value as {
    questionId?: unknown;
    variant?: unknown;
    hasAnomaly?: unknown;
  };

  return (
    typeof current.questionId === "string" &&
    isQuestionId(current.questionId) &&
    typeof current.variant === "string" &&
    isVariant(current.variant) &&
    typeof current.hasAnomaly === "boolean"
  );
}

function isValidSessionPayload(value: unknown): value is SignedGameSession {
  if (typeof value !== "object" || value === null) return false;

  const payload = value as {
    progressCount?: unknown;
    usedQuestionIds?: unknown;
    currentQuestion?: unknown;
    version?: unknown;
    issuedAt?: unknown;
    expiresAt?: unknown;
  };

  if (typeof payload.progressCount !== "number") return false;
  if (!Array.isArray(payload.usedQuestionIds)) return false;
  if (
    !payload.usedQuestionIds.every(
      (id) => typeof id === "string" && isQuestionId(id),
    )
  ) {
    return false;
  }
  if (!isValidCurrentQuestion(payload.currentQuestion)) return false;
  if (typeof payload.version !== "number") return false;
  if (typeof payload.issuedAt !== "number") return false;
  if (typeof payload.expiresAt !== "number") return false;

  return true;
}

export function createInitialSignedGameSession(): SignedGameSession {
  const now = Math.floor(Date.now() / 1000);
  return {
    progressCount: 0,
    usedQuestionIds: [],
    currentQuestion: null,
    version: TOKEN_VERSION,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };
}

export function updateSignedGameSession(
  current: SignedGameSession,
  patch: Partial<
    Pick<
      SignedGameSession,
      "progressCount" | "usedQuestionIds" | "currentQuestion"
    >
  >,
): SignedGameSession {
  const now = Math.floor(Date.now() / 1000);
  return {
    ...current,
    ...patch,
    version: TOKEN_VERSION,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };
}

export function issueSignedGameSessionToken(session: SignedGameSession) {
  const payloadBase64 = base64UrlEncode(JSON.stringify(session));
  const signature = signPayload(payloadBase64);
  return `${payloadBase64}.${signature}`;
}

export function readSignedGameSessionToken(token?: string | null) {
  if (!token) return null;

  const [payloadBase64, signature] = token.split(".");
  if (!payloadBase64 || !signature) return null;

  const expectedSignature = signPayload(payloadBase64);

  const signatureBuffer = Buffer.from(signature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  if (signatureBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) return null;

  try {
    const raw = JSON.parse(base64UrlDecode(payloadBase64));
    if (!isValidSessionPayload(raw)) return null;
    if (raw.version !== TOKEN_VERSION) return null;

    const now = Math.floor(Date.now() / 1000);
    if (raw.expiresAt <= now) return null;

    return raw;
  } catch {
    return null;
  }
}

export function getSignedSessionId(token: string) {
  const [payloadBase64] = token.split(".");
  if (!payloadBase64) return "signed-cookie";
  return payloadBase64.slice(0, 12);
}
