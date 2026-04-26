import React from "react";

import { Timer, User, Trophy, ArrowRight, RotateCcw } from 'lucide-react';

export default function ResultPage(){

    const userData = {
    name: "Name",
    time: 10,
    rank: 1,
    totalPlayers: 1
    };


    return (
        <main className="min-h-screen overflow-hidden bg-neutral-50">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#dbeafe_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fee2e2_0,transparent_40%)]" />
        <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex items-center justify-center p-6 font-sans">
            
            {/* メインカード */}
            <div className="w-full max-w-sm bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] z-10">

                {/* ヘッダー */}
                <div className="text-center mb-12">
                    <p className="text-[10px] font-black tracking-[0.3em] text-blue-500 uppercase mb-2">Final Result</p>
                    <h1 className="text-3xl font-black">FINISH</h1>
                </div>

                <div className="space-y-8 mb-12">
          
                    {/* ユーザー名 */}
                    <div className="flex items-center justify-between border-b border-muted-50 pb-4">
                        <div className="flex items-center gap-3 text-muted-foreground">
                        <User size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">User</span>
                        </div>
                    <span className="text-lg font-bold">{userData.name}</span>
                    </div>

                    {/* タイム */}
                    <div className="flex items-center justify-between border-b border-muted-50 pb-4">
                        <div className="flex items-center gap-3 text-muted-foreground">
                        <Timer size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Time</span>
                        </div>
                        <span className="text-2xl font-bold">{userData.time}</span>
                    </div>

                    {/* 順位 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-muted-foreground">
                        <Trophy size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Rank</span>
                        </div>
                        <div className="text-right">
                        <span className="text-3xl font-black text-blue-600 ">#{userData.rank}</span>
                        <span className="text-[10px] text-slate-400 font-bold block">/ {userData.totalPlayers} {userData.totalPlayers===1 ? "player":"players"}
                        </span>
                        </div>
                    </div>
                </div>

                {/* アクション */}
                <button className="group w-full bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-blue-600 transition-all duration-300 active:scale-95 shadow-xl shadow-slate-200">
                <span className="font-bold tracking-wide">なにかしら</span>
                {/* <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /> */}
                </button>
            </div>
        </div>
        </main>
    );
};