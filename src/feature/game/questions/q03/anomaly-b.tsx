import React, { useState } from "react";

export const Q03AnomalyB = () => {
  const [options, setOptions] = useState([
    { id: 1, label: "男性", value: "male" },
    { id: 2, label: "女性", value: "female" },
    { id: 3, label: "回答しない", value: "none" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleClick = (e: React.MouseEvent, clickedIndex: number) => {
    e.preventDefault(); // 本来のクリック動作をキャンセル

    // 1. クリックされたものとは別のものをランダムに選択（誤動作）
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * options.length);
    } while (randomIndex === clickedIndex && options.length > 1);
    
    setSelectedIndex(randomIndex);

    // 2. 選択肢を増殖させる
    const clickedOpt = options[clickedIndex];
    const newOption = {
      id: Date.now() + Math.random(),
      label: clickedOpt.label,
      value: clickedOpt.value,
    };
    setOptions([...options, newOption]);
  };

  return (
    <div className="space-y-6 text-black max-h-[500px] overflow-y-auto pr-2 bg-gray-50 p-4 border-inner">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-6 italic uppercase">
        Q3. 性別を選択してください
      </h2>

      <div className="flex flex-col gap-2">
        {options.map((opt, index) => (
          <div
            key={opt.id}
            onClick={(e) => handleClick(e, index)}
            className={`flex items-center p-4 border-2 transition-all cursor-pointer ${
              selectedIndex === index
                ? "border-red-600 bg-red-100 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                : "border-gray-200 bg-white hover:border-black"
            }`}
          >
            <input
              type="radio"
              readOnly
              checked={selectedIndex === index}
              className="w-5 h-5 accent-red-600 pointer-events-none"
            />
            <span className="ml-4 text-base font-bold select-none">
              {opt.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};