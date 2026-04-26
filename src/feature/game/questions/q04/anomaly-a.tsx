import React from "react";

export const Q04AnomalyA = () => {
  // 異変：0年から3000年まで（膨大なリスト）
  const years = Array.from({ length: 3001 }, (_, i) => i);
  // 異変：0月から30月まで
  const months = Array.from({ length: 31 }, (_, i) => i);
  // 異変：0日から100日まで
  const days = Array.from({ length: 101 }, (_, i) => i);

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-4 italic">
        Q4. 生年月日を入力してください
      </h2>

      <div className="flex gap-2">
        <div className="flex-[2]">
          <label className="block text-[10px] font-bold text-gray-500 mb-1 tracking-widest">YEAR</label>
          <select 
            className="w-full border-2 border-gray-300 p-2 bg-gray-50 outline-none focus:border-yellow-400 appearance-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>----</option>
            {years.map(y => <option key={y} value={y}>{y}年</option>)}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-500 mb-1 tracking-widest">MONTH</label>
          <select 
            className="w-full border-2 border-gray-300 p-2 bg-gray-50 outline-none focus:border-yellow-400 appearance-none"
            defaultValue=""
          >
            <option value="" disabled>--</option>
            {months.map(m => <option key={m} value={m}>{m}月</option>)}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-500 mb-1 tracking-widest">DAY</label>
          <select 
            className="w-full border-2 border-gray-300 p-2 bg-gray-50 outline-none focus:border-yellow-400 appearance-none"
            defaultValue=""
          >
            <option value="" disabled>--</option>
            {days.map(d => <option key={d} value={d}>{d}日</option>)}
          </select>
        </div>
      </div>
    </div>
  );
};