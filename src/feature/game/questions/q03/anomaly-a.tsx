import React, { useState } from "react";

export const Q03AnomalyA = () => {
  const [gender, setGender] = useState("");


  const options = [
    { label: "0x0045F2A1", value: "male" },
    { label: "0x0045F2A2", value: "female" },
    { label: "0x0045F2A3", value: "prefer_not_to_say" },
  ];

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-6 italic uppercase">
        Q3. 性別を選択してください
      </h2>

      <div className="flex flex-col gap-3 font-mono">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center p-4 border-2 cursor-pointer transition-all ${gender === opt.value
                ? "border-black bg-gray-100"
                : "border-gray-200 hover:border-gray-400 bg-white"
              }`}
          >
            <input
              type="radio"
              name="gender"
              value={opt.value}
              onChange={() => setGender(opt.value)}
              className="w-5 h-5 accent-black"
            />
            <span className="ml-4 text-base font-bold tracking-widest text-gray-600">
              {opt.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Q03AnomalyA;