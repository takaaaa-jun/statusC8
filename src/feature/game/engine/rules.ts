// プレイヤーの選択
import type { PlayerAction } from "../types";

type JudgeAnswerParams = {
  hasAnomaly: boolean; // 今のページに異変があるか
  action: PlayerAction; // プレイヤーの回答
  currentCount: number; // 現在の cnt
  goalCount?: number; // クリア条件（デフォルト8）
};

type JudgeAnswerResult = {
  isCorrect: boolean; // 回答が正しいか
  nextCount: number; // 次の cnt
  shouldResetQuestionPool: boolean; // flag(all_flag) をリセットするか
  isGameClear: boolean; // クリア到達したか
};

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
