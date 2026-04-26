"use client";

import { useEffect, useState } from "react";
import { RankingManager } from "@/feature/game/engine/ranking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function DemoTimerPage() {
    const [name, setName] = useState("");
    const [elapsed, setElapsed] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<{ playerName: string; timeMs: number } | null>(null);

    // リアルタイムタイマーの更新
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning) {
            timer = setInterval(() => {
                const ms = RankingManager.getElapsedMs();
                if (ms !== null) {
                    setElapsed(Math.floor(ms / 1000));
                }
            }, 100);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handleStart = () => {
        RankingManager.startTimer(name || "Demo User");
        setIsRunning(true);
        setResult(null);
    };

    const handleStop = () => {
        const data = RankingManager.stopTimer();
        setIsRunning(false);
        setResult(data);
    };

    return (
        <div className="min-h-screen bg-neutral-50 p-8 pt-24 text-neutral-900">
            <header className="fixed top-0 left-0 z-50 w-full border-b bg-white p-4 text-center shadow-sm flex items-center justify-between px-8">
                <Link href="/demo">
                    <Button variant="ghost">← Hubに戻る</Button>
                </Link>
                <div className="text-xl font-bold">
                    ⏱️ TIME: <span className="text-blue-600">{elapsed}</span>s
                </div>
                <div className="w-24"></div> {/* バランス用 */}
            </header>

            <main className="mx-auto max-w-md space-y-8">
                <div className="rounded-2xl border bg-white p-6 shadow-xl">
                    <h1 className="text-2xl font-bold border-b pb-2 mb-6">タイマー機能テスト</h1>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-neutral-600">プレイヤー名</label>
                            <Input 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="名前を入力してください"
                                disabled={isRunning}
                            />
                        </div>
                        
                        <div className="flex gap-4 pt-2">
                            <Button 
                                onClick={handleStart} 
                                disabled={isRunning}
                                className="flex-1 bg-green-600 hover:bg-green-700 h-12"
                            >
                                計測開始
                            </Button>
                            <Button 
                                onClick={handleStop} 
                                disabled={!isRunning}
                                variant="destructive"
                                className="flex-1 h-12"
                            >
                                計測停止
                            </Button>
                        </div>
                    </div>

                    {result && (
                        <div className="mt-8 rounded-xl bg-blue-50 p-4 border border-blue-100">
                            <h2 className="mb-2 font-bold text-blue-800">最新の結果:</h2>
                            <ul className="space-y-1 text-sm text-blue-700">
                                <li><strong>名前:</strong> {result.playerName}</li>
                                <li><strong>タイム:</strong> {RankingManager.formatTime(result.timeMs)}</li>
                            </ul>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
