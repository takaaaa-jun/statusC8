"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const NormalFormQ04 = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 2026 - 1950 + 1 }, (_, i) => 1950 + i).reverse();
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

 
  const triggerClass = "w-full border-2 border-gray-200 rounded-none h-12 font-bold focus:ring-0 focus:border-yellow-400 bg-gray-50";

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-4 italic">
        生年月日を入力してください
      </h2>

      <div className="flex gap-2">
        {/* 年 */}
        <div className="flex-[2]">
          <label className="block text-[10px] font-bold text-gray-500 mb-1">YEAR</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="----" />
            </SelectTrigger>
            <SelectContent>
              {years.map(y => (
                <SelectItem key={y} value={y.toString()}>{y}年</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 月 */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-400 mb-1">MONTH</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent>
              {months.map(m => (
                <SelectItem key={m} value={m.toString()}>{m}月</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 日 */}
        <div className="flex-1">
          <label className="block text-[10px] font-bold text-gray-400 mb-1">DAY</label>
          <Select>
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="--" />
            </SelectTrigger>
            <SelectContent>
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

export default NormalFormQ04;