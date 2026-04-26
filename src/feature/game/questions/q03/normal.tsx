import React, { useState } from "react";

export const NormalFormQ03 = () => {
  const [gender, setGender] = useState("");

  const options = [
    { label: "男性", value: "male" },
    { label: "女性", value: "female" },
    { label: "回答しない", value: "prefer_not_to_say" },
  ];

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-6 italic uppercase tracking-tighter">
        Q3. 性別を選択してください
      </h2>

      <div className="flex flex-col gap-3">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center p-4 border-2 cursor-pointer transition-all duration-200 ${
              gender === opt.value
                ? "border-black bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "border-gray-200 hover:border-gray-400 bg-white"
            }`}
          >
            <input
              type="radio"
              name="gender"
              value={opt.value}
              checked={gender === opt.value}
              onChange={() => setGender(opt.value)}
              className="w-5 h-5 accent-black cursor-pointer"
            />
            <span className="ml-4 text-base font-bold tracking-wider">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};