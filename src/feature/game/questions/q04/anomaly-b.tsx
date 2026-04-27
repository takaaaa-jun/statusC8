"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Q04AnomalyB = () => {
  // 正常時と同じ範囲を生成
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 1950 + i).reverse();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 数字を2進数文字列に変換する関数
  const toBinary = (num: number, digits: number) => num.toString(2).padStart(digits, '0');

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
            <SelectContent className="max-h-[300px]">
              {years.map(y => (
                <SelectItem key={y} value={y.toString()} className="font-mono">
                  {toBinary(y, 11)}
                </SelectItem>
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
                <SelectItem key={m} value={m.toString()} className="font-mono">
                  {toBinary(m, 4)}
                </SelectItem>
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
                <SelectItem key={d} value={d.toString()} className="font-mono">
                  {toBinary(d, 5)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 mt-2 font-medium">
        ※ご入力いただいた情報は、サービス向上のためのみに使用されます。
      </p>
    </div>
  );
};

export default Q04AnomalyB;