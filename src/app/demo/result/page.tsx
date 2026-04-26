"use client";

import { useEffect, useState } from "react";
import { RankingManager } from "@/feature/game/engine/ranking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Timer, User, Trophy } from "lucide-react";
import Link from "next/link";

export default function DemoResultPage() {
    const [name, setName] = useState("");
    const [elapsed, setElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<{ playerName: string; timeMs: number } | null>(null);

    // リアルタイムタイマー更新
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                const ms = RankingManager.getElapsedMs();
                if (ms !== null) setElapsed(ms);
            }, 100);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handleStart = () => {
        RankingManager.startTimer(name || "Demo User");
        setIsRunning(true);
        setResult(null);
        setElapsed(0);
    };

    const handleStop = () => {
        const data = RankingManager.stopTimer();
        setIsRunning(false);
        if (data) setResult(data);
    };

    const formatMs = (ms: number) => {
        const s = Math.floor(ms / 1000);
        const cs = Math.floor((ms % 1000) / 10);
        return `${s}.${cs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-neutral-50 p-8 pt-24 text-neutral-900">
            <header className="fixed top-0 left-0 z-50 w-full border-b bg-white p-4 shadow-sm flex items-center justify-between px-8">
                <Link href="/demo">
                    <Button variant="ghost">← Hubに戻る</Button>
                </Link>
                <div className="text-xl font-bold">
                    ⏱️ TIME:{" "}
                    <span className={isRunning ? "text-blue-600" : "text-neutral-400"}>
                        {formatMs(elapsed)}
                    </span>
                    s
                </div>
                <div className="w-24" />
            </header>

            <main className="mx-auto max-w-2xl space-y-6">
                <h1 className="text-2xl font-bold">Result画面テスト</h1>

                {/* タイマー操作パネル */}
                <div className="rounded-2xl border bg-white p-6 shadow-xl space-y-4">
                    <h2 className="font-bold text-lg border-b pb-2">① タイマー操作</h2>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-neutral-600">プレイヤー名</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="名前を入力してください"
                            disabled={isRunning}
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleStart}
                            disabled={isRunning}
                            className="flex-1 h-12 bg-green-600 hover:bg-green-700"
                        >
                            ▶ 計測開始
                        </Button>
                        <Button
                            onClick={handleStop}
                            disabled={!isRunning}
                            variant="destructive"
                            className="flex-1 h-12"
                        >
                            ■ 計測停止 → Result表示
                        </Button>
                    </div>
                    {isRunning && (
                        <p className="text-center text-sm text-blue-600 animate-pulse font-medium">
                            計測中… 停止するとResult画面が表示されます
                        </p>
                    )}
                </div>

                {/* Result画面プレビュー */}
                <div className="rounded-2xl border bg-white p-6 shadow-xl space-y-3">
                    <h2 className="font-bold text-lg border-b pb-2">② Result画面プレビュー</h2>
                    {result ? (
                        <div className="bg-[#f8fafc] rounded-[2rem] p-8 shadow-inner space-y-6">
                            <div className="text-center">
                                <p className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-1">Final Result</p>
                                <h2 className="text-3xl font-black">FINISH</h2>
                            </div>

                            <div className="space-y-4">
                                {/* ユーザー名 */}
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-3 text-neutral-400">
                                        <User size={18} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">User</span>
                                    </div>
                                    <span className="text-lg font-bold">{result.playerName}</span>
                                </div>

                                {/* タイム */}
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center gap-3 text-neutral-400">
                                        <Timer size={18} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Time</span>
                                    </div>
                                    <span className="text-2xl font-bold">
                                        {RankingManager.formatTime(result.timeMs)}
                                    </span>
                                </div>

                                {/* 順位（仮） */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-neutral-400">
                                        <Trophy size={18} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Rank</span>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-3xl font-black text-blue-600">#1</span>
                                        <span className="text-[10px] text-slate-400 font-bold block">/ 1 player</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold tracking-wide hover:bg-blue-600 transition-all duration-300">
                                なにかしら
                            </button>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-neutral-400">
                            <p className="text-4xl mb-3">🏁</p>
                            <p className="font-medium">計測停止後にResult画面が表示されます</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
