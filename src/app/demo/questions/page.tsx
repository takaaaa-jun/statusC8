"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const questionIds = ["q01", "q02", "q03", "q04", "q05", "q06", "q07", "q08"];

export default function QuestionsHubPage() {
    return (
        <div className="min-h-screen bg-neutral-50 p-8 pt-24 text-neutral-900">
            <header className="fixed top-0 left-0 z-50 w-full border-b bg-white p-4 shadow-sm flex items-center justify-between px-8">
                <Link href="/demo">
                    <Button variant="ghost">← Hubに戻る</Button>
                </Link>
                <h1 className="text-xl font-bold">❓ Questions Hub</h1>
                <div className="w-24"></div>
            </header>

            <main className="mx-auto max-w-4xl space-y-8">
                <div className="rounded-2xl border bg-white p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-6">問題を選択してください</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {questionIds.map(q => (
                            <Link key={q} href={`/demo/questions/${q}`}>
                                <Button className="w-full h-32 text-2xl flex flex-col gap-2 rounded-2xl transition-all hover:scale-105">
                                    <span className="text-xs opacity-50">QUESTION</span>
                                    {q.toUpperCase()}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-sm text-blue-800 shadow-sm leading-relaxed">
                    <p className="font-bold mb-2">💡 ディレクトリ構成について:</p>
                    <p>
                        各問題は <code>/demo/questions/[qid]</code> という形式で独立して管理されています。
                        今後新しい問題（q07, q08...）を追加した際も、このリンクを増やすだけで自動的にプレビュー可能になります。
                    </p>
                </div>
            </main>
        </div>
    );
}
