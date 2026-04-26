import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const languages = [
  { id: "js", label: "JavaScript" },
  { id: "ts", label: "TypeScript" },
  { id: "py", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
  { id: "cs", label: "C#" },
  { id: "rust", label: "Rust" },
  { id: "go", label: "Go" },
  { id: "swift", label: "Swift" },
  { id: "php", label: "PHP" },
  { id: "ruby", label: "Ruby" },
  { id: "other", label: "その他" },
]

export const NormalFormQ07 = () => {
  const [selected, setSelected] = useState<string[]>([])
  const [otherText, setOtherText] = useState("")

  const handleCheckedChange = (id: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    )
  }

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-6 italic uppercase">
         開発経験のある言語（複数選択可）
      </h2>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        {languages.map((lang) => (
          <div key={lang.id} className="flex items-center space-x-3">
            <Checkbox
              id={lang.id}
              checked={selected.includes(lang.id)}
              onCheckedChange={(checked) => handleCheckedChange(lang.id, !!checked)}
              className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:text-white"
            />
            <Label
              htmlFor={lang.id}
              className="text-sm font-bold cursor-pointer select-none leading-none"
            >
              {lang.label}
            </Label>
          </div>
        ))}
      </div>

      {selected.includes("other") && (
        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Please specify
          </Label>
          <Input
            type="text"
            placeholder="言語名を入力してください"
            value={otherText}
            onChange={(e) => setOtherText(e.target.value)}
            className="mt-1 border-2 border-gray-200 focus:border-black rounded-none"
          />
        </div>
      )}
    </div>
  )
}