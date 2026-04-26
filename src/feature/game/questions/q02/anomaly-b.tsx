// src/feature/game/questions/q02/anomaly-a.tsx
import React from "react";

export const Q2AnomalyB = () => {
  // すべてひらがなの都道府県リスト
  const prefecturesHiragana = [
    "ほっかいどう", "あおもりけん", "いわてけん", "みやぎけん", "あきたけん", "やまがたけん", "ふくしまけん",
    "いばらきけん", "とちぎけん", "ぐんまけん", "さいたまけん", "ちばけん", "とうきょうと", "かながわけん",
    "にいがたけん", "とやまけん", "いしかわけん", "ふくいけん", "やまなしけん", "ながのけん", "ぎふけん",
    "しずおかけん", "あいちけん", "みえけん", "しがけん", "きょうとふ", "おおさかふ", "ひょうごけん",
    "ならけん", "わかやまけん", "とっとりけん", "しまねけん", "おかやまけん", "ひろしまけん", "やまぐちけん",
    "とくしまけん", "かがわけん", "えひめけん", "こうちけん", "ふくおかけん", "さがけん", "ながさきけん",
    "くまもとけん", "おおいたけん", "みやざきけん", "かごしまけん", "おきなわけん"
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-4 italic">
        Q2. 現住所を選択してください
      </h2>
      <select
        className="w-full border-2 border-gray-300 p-3 bg-gray-50 text-black"
        defaultValue=""
      >
        <option value="" disabled>都道府県を選択してください</option>
        {prefecturesHiragana.map((pref) => (
          <option key={pref} value={pref}>{pref}</option>
        ))}
      </select>
    </div>
  );
};

export default Q2AnomalyB;