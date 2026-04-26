// src/feature/game/questions/q02/anomaly-a.tsx
import React from "react";

export const Q02AnomalyA = () => {
  const prefecturesArabic = [
    "هوكايدو", "أوموري", "إيواتي", "مياغي", "أكيتا", "ياغاتا", "فوكوشيما",
    "إيباراكي", "توتشيغي", "غونما", "سايتاما", "تشيبا", "طوكيو", "كاناغاوا",
    "نييغاتا", "توياما", "إيشيكاوا", "فوكوي", "ياماناشي", "ناغانو", "غيفو",
    "شيزوكا", "آيتشي", "ميي", "شيغا", "كيوتو", "أوساكا", "هيوغو",
    "نارا", "واكاياما", "توتوري", "شيماني", "أوكاياما", "هيروشيما", "ياماغوتشي",
    "توكوشيما", "كاغاوا", "إيهيمي", "كوتشي", "فوكوكا", "ساغا", "ناغاساكي",
    "كوماموتو", "أويتا", "ميازاكي", "كاغوشيما", "أوكيناوا"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-4 italic">
        Q2. 現住所を選択してください
      </h2>
      <select className="w-full border-2 border-gray-300 p-3 bg-gray-50 text-black">
        <option value="" disabled selected>都道府県を選択してください</option>
        {prefecturesArabic.map((pref) => (
          <option key={pref} value={pref}>{pref}</option>
        ))}
      </select>
    </div>
  );
};