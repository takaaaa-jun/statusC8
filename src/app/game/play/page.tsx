"use client";

import { useMemo, useState, Image } from "react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";
import type {
  PlayerAction,
  QuestionId,
  StartGameResponse,
  Variant,
} from "@/feature/game/types";

import Q01Normal from "@/feature/game/questions/q01/normal";
import Q01AnomalyA from "@/feature/game/questions/q01/anomaly-a";
import Q01AnomalyB from "@/feature/game/questions/q01/anomaly-b";

import { NormalFormQ02 } from "@/feature/game/questions/q02/normal";
import { Q02AnomalyA } from "@/feature/game/questions/q02/anomaly-a";
import { Q2AnomalyB } from "@/feature/game/questions/q02/anomaly-b";

import Q03AnomalyA from "@/feature/game/questions/q03/anomaly-a";

import { NormalFormQ04 } from "@/feature/game/questions/q04/normal";
import { Q04AnomalyA } from "@/feature/game/questions/q04/anomaly-a";
import { Q04AnomalyB } from "@/feature/game/questions/q04/anomaly-b";

import Q05Normal from "@/feature/game/questions/q05/normal";
import Q05AnomalyA from "@/feature/game/questions/q05/anomaly-a";
import Q05AnomalyB from "@/feature/game/questions/q05/anomaly-b";

import Q06Normal from "@/feature/game/questions/q06/normal";
import Q06AnomalyA from "@/feature/game/questions/q06/anomaly-a";
import Q06AnomalyB from "@/feature/game/questions/q06/anomaly-b";

const ACTION_LABELS: Record<PlayerAction, string> = {
  advance: "進む",
  "turn-back": "引き返す",
};

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

const QUESTION_COMPONENTS: Record<
  QuestionId,
  Partial<Record<Variant, QuestionComponent>>
> = {
  q01: {
    normal: Q01Normal,
    "anomaly-a": Q01AnomalyA,
    "anomaly-b": Q01AnomalyB,
  },
  q02: {
    normal: NormalFormQ02,
    "anomaly-a": Q02AnomalyA,
    "anomaly-b": Q2AnomalyB,
  },
  q03: {
    "anomaly-a": Q03AnomalyA,
  },
  q04: {
    normal: NormalFormQ04,
    "anomaly-a": Q04AnomalyA,
    "anomaly-b": Q04AnomalyB,
  },
  q05: {
    normal: Q05Normal,
    "anomaly-a": Q05AnomalyA,
    "anomaly-b": Q05AnomalyB,
  },
  q06: {
    normal: Q06Normal,
    "anomaly-a": Q06AnomalyA,
    "anomaly-b": Q06AnomalyB,
  },
};

export default function GamePlayPage() {
  // API 通信中かどうかを管理する
  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);
  // 画面に出すエラーメッセージ
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 現在の問題を保持する
  const [currentQuestion, setCurrentQuestion] =
    useState<StartGameResponse | null>(null);

  // 問題が表示されているかどうかをまとめて扱う
  const hasQuestion = currentQuestion !== null;
  // start / answer のどちらかが動いている間は操作を止める
  const isBusy = isLoadingStart || isLoadingAnswer;

  // questionId と variant から、対応する問題コンポーネントを選ぶ
  const QuestionView = useMemo(() => {
    if (!currentQuestion) return null;

    const questionMap = QUESTION_COMPONENTS[currentQuestion.questionId];
    const Selected = questionMap?.[currentQuestion.variant];

    if (!Selected) {
      return (
        <MissingQuestion
          questionId={currentQuestion.questionId}
          variant={currentQuestion.variant}
        />
      );
    }

    return <Selected />;
  }, [currentQuestion]);

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

      await response.json();

      // 回答結果は画面に残さず、そのまま次の問題へ進む
      await loadNextQuestion();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "不明なエラー");
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        {/* タイトル画像 */}
        <div className="mb-8 flex justify-center">
          <Image src="/titlelogo.png" alt="Title Logo" />
        </div>

        {/* ゲーム本体の表示エリア */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <div className="relative text-center">
            {/* 左上に現在の cnt を表示する */}
            <div className="absolute top-0 left-0 text-sm text-white/70">
              cnt: {currentQuestion?.progressCount ?? 0}
            </div>
            <h1 className="text-3xl font-semibold">Are you ready?</h1>
            <p className="mt-2 text-sm text-white/70">
              異変を見つけたら引き返す。異変がなければ進む。
            </p>
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

          {/* currentQuestion があるときだけ、実際の問題コンポーネントを描画する */}
          {hasQuestion && (
            <div className="mt-6 rounded-xl border border-white/10 bg-white p-4 text-black">
              {QuestionView}
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
