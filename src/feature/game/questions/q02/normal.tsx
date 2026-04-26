import React from "react";

export const NormalFormQ02 = () => {
  // 47都道府県のリスト
  const prefectures = [
    "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
    "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
    "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
    "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
    "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
    "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
    "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
  ];

  return (
    <div className="space-y-6">
      {/* 見出し */}
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-4 italic">
        Q2. 現住所を選択してください
      </h2>

      {/* 都道府県セレクトボックス */}
      <div>
        <label className="block text-xs font-bold mb-1 uppercase tracking-widest text-gray-500">
          Province / State
        </label>
        <select 
          className="w-full border-2 border-gray-300 p-3 bg-gray-50 focus:border-yellow-400 outline-none appearance-none cursor-pointer text-black"
          defaultValue=""
        >
          <option value="" disabled>都道府県を選択してください</option>
          {prefectures.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NormalFormQ02;