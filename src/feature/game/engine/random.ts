import type { PickNextQuestionResult, QuestionId, Variant } from "../types";

// 問題プール（ここを増やすと問題数を増やせる）
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

// バリエーションプール（normal 1 + anomaly 2）
const VARIANTS: Variant[] = ["normal", "anomaly-a", "anomaly-b"];

// 配列からランダムで1件選ぶ共通関数
function pickRandom<T>(items: T[]): T {
  const index = Math.floor(Math.random() * items.length);
  return items[index];
}

// 次の問題を抽選する
export function pickNextQuestion(used: QuestionId[]): PickNextQuestionResult {
  // まだ使っていない問題だけを抽出
  const pool = QUESTION_IDS.filter((id) => !used.includes(id));

  // 全問題を使い切っていたらリセット扱い
  const didReset = pool.length === 0;

  // リセット時は全問題から、通常時は未使用問題から抽選
  const candidates = didReset ? QUESTION_IDS : pool;

  // 問題IDを抽選
  const questionId = pickRandom(candidates);

  // 正常/異変パターンを抽選
  const variant = pickRandom(VARIANTS);

  // normal 以外なら異変あり
  const hasAnomaly = variant !== "normal";

  // 使用済み問題一覧を更新
  // リセット時は新しく開始するので今回の1件だけ持つ
  const nextUsedQuestionIds = didReset ? [questionId] : [...used, questionId];

  return {
    questionId,
    variant,
    hasAnomaly,
    nextUsedQuestionIds,
    didReset,
  };
}
