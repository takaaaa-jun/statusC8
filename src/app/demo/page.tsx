"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DemoHubPage() {
    return (
        <div className="min-h-screen bg-neutral-50 p-8 pt-20 text-neutral-900">
            <header className="fixed top-0 left-0 z-50 w-full border-b bg-white p-4 shadow-sm">
                <h1 className="text-xl font-bold text-center">🛠️ Demo & Test Hub</h1>
            </header>

            <main className="mx-auto max-w-2xl space-y-6 mt-10">
                <div className="rounded-2xl border bg-white p-8 shadow-xl">
                    <h2 className="text-2xl font-bold mb-4">テストメニュー</h2>
                    <p className="text-neutral-600 mb-8">各機能の動作確認とプレビューを行うためのページです。</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/demo/timer">
                            <Button className="w-full h-24 text-lg flex flex-col gap-2 bg-blue-600 hover:bg-blue-700">
                                <span>⏱️</span>
                                <span>タイマー機能テスト</span>
                            </Button>
                        </Link>
                        
                        <Link href="/demo/questions">
                            <Button className="w-full h-24 text-lg flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
                                <span>❓</span>
                                <span>問題プレビュー (q01-q06)</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800 text-sm">
                    <p><strong>注意:</strong> このディレクトリはテスト用です。本番環境（GitHubへのプッシュ）の前に削除するか、.gitignore で除外してください。</p>
                </div>
            </main>
        </div>
    );
}
