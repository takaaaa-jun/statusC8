"use client";

import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function RadioGroupChoiceCard() {
  const [items, setItems] = useState([
    { id: "male", value: "male", label: "男性" },
    { id: "female", value: "female", label: "女性" },
    { id: "secret", value: "secret", label: "回答しない" },
  ]);
  const [selectedValue, setSelectedValue] = useState("");

  const labelOptions = ["男性", "女性", "回答しない"];

  const handleValueChange = (newVal: string) => {
    setSelectedValue(newVal);
    
    // 3つの選択肢からランダムに選んで追加
    const randomLabel = labelOptions[Math.floor(Math.random() * labelOptions.length)];
    const uniqueId = `item-${Date.now()}`;
    
    setItems((prev) => [
      ...prev, 
      { id: uniqueId, value: uniqueId, label: randomLabel }
    ]);
  };

  return (
    <main>
    <div className="text-center pb-4">
      <h4>性別を選択してください。</h4>
    </div>
      
    <div className="flex justify-center">
    <RadioGroup className="max-w-sm" onValueChange={handleValueChange} value={selectedValue}>
      {items.map((item) => {
        const isSelected = selectedValue === item.value;
        
        return (
          <FieldLabel key={item.id} htmlFor={item.id}>     
            <Field 
              orientation="horizontal" 
              // 選択時に角丸の枠線を赤くし、背景も薄く赤にする
              className={isSelected ? "text-red-500 bg-red-50 border border-red-500 rounded-md" : "border border-transparent"}
            >
              <RadioGroupItem 
                value={item.value} 
                id={item.id}
                // ラジオボタン自体の枠も濃く(slate-900)、選択時は赤(red-500)
                className={`${isSelected ? "border-red-500" : "border-slate-400"}`} 
              />
              <FieldContent>
                <FieldTitle>{item.label}</FieldTitle>
              </FieldContent>
            </Field>
          </FieldLabel>
        );
      })}
    </RadioGroup>
    </div>
    </main>
  )
}