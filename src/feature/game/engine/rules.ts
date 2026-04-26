import type { JudgeAnswerParams, JudgeAnswerResult } from "../types";

// 判定ルール:
// 異変あり   -> 引き返す が正解
// 異変なし   -> 次に進む が正解
export function judgeAnswer({
  hasAnomaly,
  action,
  currentCount,
  goalCount = 9,
}: JudgeAnswerParams): JudgeAnswerResult {
  const isCorrect =
    (hasAnomaly && action === "turn-back") ||
    (!hasAnomaly && action === "advance");

  // 不正解なら cnt=0、flagリセット
  if (!isCorrect) {
    return {
      isCorrect: false,
      nextCount: 0,
      shouldResetQuestionPool: true,
      isGameClear: false,
    };
  }

  // 正解なら cnt を進める
  const nextCount = currentCount + 1;

  return {
    isCorrect: true,
    nextCount,
    shouldResetQuestionPool: false,
    isGameClear: nextCount >= goalCount,
  };
}
