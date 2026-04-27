"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Q04AnomalyA = () => {
  // 異変：0年から3000年まで（膨大なリスト）
  const years = Array.from({ length: 3001 }, (_, i) => i);
  // 異変：0月から30月まで
  const months = Array.from({ length: 31 }, (_, i) => i);
  // 異変：0日から100日まで
  const days = Array.from({ length: 101 }, (_, i) => i);

  // Normal版と共通のスタイル
  const triggerClass = "w-full border-2 border-gray-200 rounded-none h-12 font-bold focus:ring-0 focus:border-yellow-400 bg-gray-50 text-black";

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-4 italic">
        生年月日を入力してください
      </h2>

      <div className="flex gap-2">
        {/* 年 (YEAR) */}
        <div className="flex-[2]">
          <label className="block text-[10px] font-bold text-gray-500 mb-1 tracking-widest">YEAR</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="----" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]"> {/* 3000件あるので高さを制限 */}
              {years.map(y => (
                <SelectItem key={y} value={y.toString()}>{y}年</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 月 (MONTH) */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-500 mb-1 tracking-widest">MONTH</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {months.map(m => (
                <SelectItem key={m} value={m.toString()}>{m}月</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 日 (DAY) */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-500 mb-1 tracking-widest">DAY</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {days.map(d => (
                <SelectItem key={d} value={d.toString()}>{d}日</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Q04AnomalyA;