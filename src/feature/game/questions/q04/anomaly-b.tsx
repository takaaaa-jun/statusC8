import React from "react";

export const Q04AnomalyB = () => {
  // 正常時と同じ範囲を生成
  const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 1950 + i).reverse();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 数字を2進数文字列に変換する関数
  const toBinary = (num: number, digits: number) => num.toString(2).padStart(digits, '0');

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-4 italic">
        Q4. 生年月日を入力してください
      </h2>

      <div className="flex gap-2">
        <div className="flex-[2]">
          <label className="block text-[10px] font-bold text-gray-500 mb-1">YEAR</label>
          <select className="w-full border-2 border-gray-300 p-2 bg-gray-50 outline-none focus:border-yellow-400 appearance-none cursor-pointer" defaultValue="">
            <option value="" disabled>----</option>
            {years.map(y => (
              <option key={y} value={y}>{toBinary(y, 11)}</option>
            ))}
          </select>
        </div>

        
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-500 mb-1">MONTH</label>
          <select className="w-full border-2 border-gray-300 p-2 bg-gray-50 outline-none focus:border-yellow-400 appearance-none cursor-pointer" defaultValue="">
            <option value="" disabled>--</option>
            {months.map(m => (
              <option key={m} value={m}>{toBinary(m, 4)}</option>
            ))}
          </select>
        </div>


        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-500 mb-1">DAY</label>
          <select className="w-full border-2 border-gray-300 p-2 bg-gray-50 outline-none focus:border-yellow-400 appearance-none cursor-pointer" defaultValue="">
            <option value="" disabled>--</option>
            {days.map(d => (
              <option key={d} value={d}>{toBinary(d, 5)}</option>
            ))}
          </select>
        </div>
      </div>
      
      <p className="text-[10px] text-gray-400 mt-2 font-medium">
        ※ご入力いただいた情報は、サービス向上のためのみに使用されます。
      </p>
    </div>
  );
};