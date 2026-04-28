"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import type {
  AnswerResponse,
  PlayerAction,
  QuestionId,
  StartGameResponse,
  Variant,
} from "@/feature/game/types";

const ACTION_LABELS: Record<PlayerAction, string> = {
  advance: "進む",
  "turn-back": "引き返す",
};

const VISIBLE_CNT_MAX = 8;
const CLEAR_CNT = 9;

// API から返る questionId / variant に応じて、実際の問題コンポーネントを表示する
function MissingQuestion(props: { questionId: QuestionId; variant: Variant }) {
  return (
    <section className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-900">
      <h2 className="text-lg font-bold">問題コンポーネント未実装</h2>
      <p className="mt-2 text-sm">
        questionId: {props.questionId} / variant: {props.variant}
      </p>
      <p className="mt-1 text-sm">
        対応する問題ファイルが空か、export未定義の可能性があります。
      </p>
    </section>
  );
}

type QuestionComponent = ComponentType;

const QuestionLoading = () => (
  <div className="rounded-xl border border-white/10 bg-white p-4 text-center text-sm text-black/70">
    問題を読み込み中...
  </div>
);

const QUESTION_COMPONENTS: Record<
  QuestionId,
  Record<Variant, QuestionComponent>
> = {
  q01: {
    normal: dynamic(() => import("@/feature/game/questions/q01/normal"), {
      loading: QuestionLoading,
    }),
    "anomaly-a": dynamic(
      () => import("@/feature/game/questions/q01/anomaly-a"),
      {
        loading: QuestionLoading,
      },
    ),
    "anomaly-b": dynamic(
      () => import("@/feature/game/questions/q01/anomaly-b"),
      {
        loading: QuestionLoading,
      },
    ),
  },
  q02: {
    normal: dynamic(() => import("@/feature/game/questions/q02/normal"), {
      loading: QuestionLoading,
    }),
    "anomaly-a": dynamic(
      () => import("@/feature/game/questions/q02/anomaly-a"),
      {
        loading: QuestionLoading,
      },
    ),
    "anomaly-b": dynamic(
      () => import("@/feature/game/questions/q02/anomaly-b"),
      {
        loading: QuestionLoading,
      },
    ),
  },
  q03: {
    normal: dynamic(() => import("@/feature/game/questions/q03/normal"), {
      loading: QuestionLoading,
    }),
    "anomaly-a": dynamic(
      () => import("@/feature/game/questions/q03/anomaly-a"),
      {
        loading: QuestionLoading,
      },
    ),
    "anomaly-b": dynamic(
      () => import("@/feature/game/questions/q03/anomaly-b"),
      {
        loading: QuestionLoading,
      },
    ),
  },
  q04: {
    normal: dynamic(() => import("@/feature/game/questions/q04/normal"), {
      loading: QuestionLoading,
    }),
    "anomaly-a": dynamic(
      () => import("@/feature/game/questions/q04/anomaly-a"),
      {
        loading: QuestionLoading,
      },
    ),
    "anomaly-b": dynamic(
      () => import("@/feature/game/questions/q04/anomaly-b"),
      {
        loading: QuestionLoading,
      },
    ),
  },
  q05: {
    normal: dynamic(() => import("@/feature/game/questions/q05/normal"), {
      loading: QuestionLoading,
    }),
    "anomaly-a": dynamic(
      () => import("@/feature/game/questions/q05/anomaly-a"),
      {
        loading: QuestionLoading,
      },
    ),
    "anomaly-b": dynamic(
      () => import("@/feature/game/questions/q05/anomaly-b"),
      {
        loading: QuestionLoading,
      },
    ),
  },
  q06: {
    normal: dynamic(() => import("@/feature/game/questions/q06/normal"), {
      loading: QuestionLoading,
    }),
    "anomaly-a": dynamic(
      () => import("@/feature/game/questions/q06/anomaly-a"),
      {
        loading: QuestionLoading,
      },
    ),
    "anomaly-b": dynamic(
      () => import("@/feature/game/questions/q06/anomaly-b"),
      {
        loading: QuestionLoading,
      },
    ),
  },
};

export default function GamePlayPage() {
  const router = useRouter();
  // API 通信中かどうかを管理する
  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  // 画面に出すエラーメッセージ
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 現在の問題を保持する
  const [currentQuestion, setCurrentQuestion] =
    useState<StartGameResponse | null>(null);
  const progressCount = currentQuestion?.progressCount ?? 0;
  const visibleCnt = Math.min(progressCount, VISIBLE_CNT_MAX);

  // 問題が表示されているかどうかをまとめて扱う
  const hasQuestion = currentQuestion !== null;
  // start / answer のどちらかが動いている間は操作を止める
  const isBusy = isLoadingStart || isLoadingAnswer || isResetting;

  const SelectedQuestionView = currentQuestion
    ? QUESTION_COMPONENTS[currentQuestion.questionId]?.[currentQuestion.variant]
    : null;

  // サーバーに次の問題を要求して、そのまま表示する
  const loadNextQuestion = async () => {
    setIsLoadingStart(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/game/start", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(errorData.message || "ゲーム開始に失敗しました");
      }

      const data = (await response.json()) as StartGameResponse;
      setCurrentQuestion(data);
      return data;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "不明なエラー");
      return null;
    } finally {
      setIsLoadingStart(false);
    }
  };

  // 最初の開始ボタンからも、回答後の次の問題表示からも使う
  const startGame = async () => {
    await loadNextQuestion();
  };

  // 現在のセッションをリセットして、開始前の状態に戻す
  const resetGame = async () => {
    setIsResetting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/game/start?reset=1", {
        method: "POST",
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(errorData.message || "リセットに失敗しました");
      }

      setCurrentQuestion(null);
      router.replace("/game/play");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "不明なエラー");
    } finally {
      setIsResetting(false);
    }
  };

  // 現在の問題に対する回答をサーバーへ送る
  const submitAnswer = async (action: PlayerAction) => {
    if (!currentQuestion) return;

    setIsLoadingAnswer(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/game/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const errorData = (await response.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(errorData.message || "回答送信に失敗しました");
      }

      const answerResult = (await response.json()) as AnswerResponse;

      if (answerResult.isGameClear || answerResult.progressCount >= CLEAR_CNT) {
        router.replace(`/game/result?cnt=${answerResult.progressCount}`);
        return;
      }

      const nextQuestion = await loadNextQuestion();

      // cnt は 8 まで表示し、9 到達でクリア扱いにする
      if (nextQuestion && nextQuestion.progressCount >= CLEAR_CNT) {
        router.replace(`/game/result?cnt=${nextQuestion.progressCount}`);
        return;
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "不明なエラー");
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <aside className="fixed top-4 left-4 z-50 rounded-2xl border-2 border-white bg-black/95 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur sm:top-6 sm:left-6 sm:p-4">
        <div className="mt-1 flex items-end gap-2">
          <span className="font-mono text-3xl leading-none font-black tracking-wider text-white tabular-nums sm:text-4xl">
            {visibleCnt.toString().padStart(2, "0")}
          </span>
          <span className="mb-0.5 text-xs font-semibold text-white/70 sm:text-sm">
            / 08
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-white transition-all duration-300"
            style={{
              width: `${Math.min((visibleCnt / VISIBLE_CNT_MAX) * 100, 100)}%`,
            }}
          />
        </div>
      </aside>

      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* タイトル画像 */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/titlelogo.png"
            alt="Title Logo"
            width={360}
            height={120}
          />
        </div>

        {/* ゲーム本体の表示エリア */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="relative text-center">
            <h1 className="text-3xl font-semibold">
              異変を見つけたら引き返す。異変がなければ進む。
            </h1>
          </div>

          {!hasQuestion && (
            <div className="mt-6 flex justify-center">
              <Button
                className="bg-green-600 text-white hover:bg-green-700"
                onClick={startGame}
                disabled={isBusy}
              >
                {isLoadingStart ? "LOADING..." : "ゲーム開始"}
              </Button>
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <Button
              variant="ghost"
              className="text-white/80 hover:bg-white/10 hover:text-white"
              onClick={resetGame}
              disabled={isBusy}
            >
              {isResetting ? "リセット中..." : "最初からやり直す"}
            </Button>
          </div>

          {/* currentQuestion があるときだけ、実際の問題コンポーネントを描画する */}
          {hasQuestion && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white p-4 text-black">
              {SelectedQuestionView && currentQuestion ? (
                <SelectedQuestionView />
              ) : currentQuestion ? (
                <MissingQuestion
                  questionId={currentQuestion.questionId}
                  variant={currentQuestion.variant}
                />
              ) : null}
            </div>
          )}

          {/* 回答ボタン。問題が表示されている時だけ押せる */}
          {hasQuestion && (
            <div className="mt-6 flex items-center justify-between gap-3">
              <Button
                variant="secondary"
                className="min-w-32 bg-white/10 text-white hover:bg-white/20"
                onClick={() => submitAnswer("turn-back")}
                disabled={isBusy}
              >
                {ACTION_LABELS["turn-back"]}
              </Button>
              <Button
                className="min-w-32 bg-white text-black hover:bg-white/80"
                onClick={() => submitAnswer("advance")}
                disabled={isBusy}
              >
                {ACTION_LABELS.advance}
              </Button>
            </div>
          )}

          {/* 通信エラーを画面に出す */}
          {errorMessage && (
            <p className="mt-4 text-center text-sm text-red-400">
              {errorMessage}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
