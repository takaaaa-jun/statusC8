import React, { useRef, useState } from "react";

export const Q03AnomalyB = () => {
  const [options, setOptions] = useState([
    { id: 1, label: "男性", value: "male" },
    { id: 2, label: "女性", value: "female" },
    { id: 3, label: "回答しない", value: "none" },
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const nextOptionIdRef = useRef(4);

  const handleClick = (e: React.MouseEvent, clickedIndex: number) => {
    e.preventDefault(); // 本来のクリック動作をキャンセル

    // 1. クリックされたものとは別のものを選択（誤動作）
    const nextIndex =
      options.length > 1 ? (clickedIndex + 1) % options.length : clickedIndex;

    setSelectedIndex(nextIndex);

    // 2. 選択肢を増殖させる
    const clickedOpt = options[clickedIndex];
    const newOption = {
      id: nextOptionIdRef.current,
      label: clickedOpt.label,
      value: clickedOpt.value,
    };
    nextOptionIdRef.current += 1;
    setOptions([...options, newOption]);
  };

  return (
    <div className="border-inner max-h-125 space-y-6 overflow-y-auto bg-gray-50 p-4 pr-2 text-black">
      <h2 className="mb-6 border-b-4 border-black pb-2 text-xl font-black uppercase italic">
        Q3. 性別を選択してください
      </h2>

      <div className="flex flex-col gap-2">
        {options.map((opt, index) => (
          <div
            key={opt.id}
            onClick={(e) => handleClick(e, index)}
            className={`flex cursor-pointer items-center border-2 p-4 transition-all ${
              selectedIndex === index
                ? "border-red-600 bg-red-100 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                : "border-gray-200 bg-white hover:border-black"
            }`}
          >
            <input
              type="radio"
              readOnly
              checked={selectedIndex === index}
              className="pointer-events-none h-5 w-5 accent-red-600"
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

export default Q03AnomalyB;
