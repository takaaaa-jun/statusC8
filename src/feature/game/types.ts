// 基本の型
export type QuestionId = "q01" | "q02" | "q03" | "q04" | "q05" | "q06";
export type Variant = "normal" | "anomaly-a" | "anomaly-b";
export type PlayerAction = "advance" | "turn-back";

// セッション・画面側の型
export type SelectedQuestion = {
  questionId: QuestionId;
  variant: Variant;
  hasAnomaly: boolean;
};

export type GameSession = {
  sessionId: string;
  progressCount: number;
  usedQuestionIds: QuestionId[];
  currentQuestion: SelectedQuestion | null;
};

// API用の型
export type StartGameResponse = {
  sessionId: string;
  questionId: QuestionId;
  variant: Variant;
  usedQuestionIds: QuestionId[];
  progressCount: number;
  didReset: boolean;
};

export type AnswerRequestBody = {
  action: PlayerAction;
};

export type AnswerResponse = {
  isCorrect: boolean;
  isGameClear: boolean;
  progressCount: number;
  shouldResetQuestionPool: boolean;
};

// エンジン用の型
export type PickNextQuestionResult = {
  questionId: QuestionId;
  variant: Variant;
  hasAnomaly: boolean;
  nextUsedQuestionIds: QuestionId[];
  didReset: boolean;
};

export type JudgeAnswerParams = {
  hasAnomaly: boolean;
  action: PlayerAction;
  currentCount: number;
  goalCount?: number;
};

export type JudgeAnswerResult = {
  isCorrect: boolean;
  nextCount: number;
  shouldResetQuestionPool: boolean;
  isGameClear: boolean;
};
