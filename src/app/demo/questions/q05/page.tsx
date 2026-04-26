"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const qid = "q05";
const typeMap = {
    "1": "normal",
    "2": "anomaly-a",
    "3": "anomaly-b"
};

export default function Q05PreviewPage() {
    const [selectedNum, setSelectedNum] = useState("1");
    const [TargetComponent, setTargetComponent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const selectedType = typeMap[selectedNum as keyof typeof typeMap];

    useEffect(() => {
        setIsLoading(true);
        setTargetComponent(null);

        import(`@/feature/game/questions/${qid}/${selectedType}`)
            .then((mod) => {
                setTargetComponent(() => mod.default);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Import failed:", err);
                setTargetComponent(() => () => (
                    <div className="p-10 text-red-500 bg-red-50 rounded-xl border border-red-200">
                        コンポーネントが見つかりません: {qid}/{selectedType}
                    </div>
                ));
                setIsLoading(false);
            });
    }, [selectedNum]);

    return (
        <div className="min-h-screen bg-neutral-50 p-8 pt-24 text-neutral-900">
            <header className="fixed top-0 left-0 z-50 w-full border-b bg-white p-4 shadow-sm flex items-center justify-between px-8">
                <Link href="/demo/questions">
                    <Button variant="ghost">← 問題一覧に戻る</Button>
                </Link>
                <h1 className="text-xl font-bold uppercase">{qid.toUpperCase()} Preview</h1>
                <div className="w-24"></div>
            </header>

            <main className="mx-auto max-w-5xl space-y-6">
                <div className="rounded-xl border bg-white p-4 shadow-sm flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <span className="text-sm font-bold text-neutral-500">TYPE:</span>
                        <div className="flex gap-2">
                            {[1, 2, 3].map(num => (
                                <Button 
                                    key={num}
                                    variant={selectedNum === num.toString() ? "default" : "outline"}
                                    onClick={() => setSelectedNum(num.toString())}
                                    className="w-12 h-10 font-bold"
                                >
                                    {num}
                                </Button>
                            ))}
                        </div>
                        <span className="text-xs text-neutral-400 italic">
                            (1: Normal, 2: Anomaly-A, 3: Anomaly-B)
                        </span>
                    </div>
                    
                    <div className="text-xs font-mono text-neutral-400 bg-neutral-50 px-3 py-1 rounded border">
                        {qid}/{selectedType}.tsx
                    </div>
                </div>

                <section className="bg-white rounded-2xl border shadow-xl overflow-hidden min-h-[600px] relative">
                    <div className="p-8">
                        {isLoading ? (
                            <div className="p-10 animate-pulse bg-neutral-100 rounded-xl text-center">
                                Loading {qid.toUpperCase()}...
                            </div>
                        ) : (
                            TargetComponent && <TargetComponent />
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
