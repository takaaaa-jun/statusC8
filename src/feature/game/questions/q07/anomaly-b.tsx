"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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

export const Q07AnomalyB = () => {
  const [fallingIds, setFallingIds] = useState<string[]>([])

  useEffect(() => {
    // 2秒後に最初の落下を開始
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setFallingIds((prev) => {
          const remaining = languages.filter((l) => !prev.includes(l.id))
          if (remaining.length === 0) {
            clearInterval(interval)
            return prev
          }
          // ランダムに1つ選んで落下させる
          const nextId = remaining[Math.floor(Math.random() * remaining.length)].id
          return [...prev, nextId]
        })
      }, 800) // 0.8秒ごとに次々と落ちる
      return () => clearInterval(interval)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="w-full text-black bg-white overflow-hidden p-2">
      <h2 className="text-xl font-black border-b-4 border-black pb-2 mb-6 italic uppercase">
        開発経験のある言語（複数選択可）
      </h2>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8">
        {languages.map((lang) => {
          const isFalling = fallingIds.includes(lang.id)

          return (
            <motion.div
              key={lang.id}
              className="flex items-center space-x-3"
              // 落ちるアニメーション
              animate={isFalling ? { 
                y: 800,      
                rotate: 45,  
                opacity: 0   
              } : { 
                y: 0, 
                rotate: 0, 
                opacity: 1 
              }}
              transition={{ 
                duration: 2.5,
                ease: "easeIn" 
              }}
            >
              <Checkbox
                id={lang.id}
                className="border-2 border-black data-[state=checked]:bg-black"
              />
              <Label htmlFor={lang.id} className="text-sm font-bold cursor-pointer">
                {lang.label}
              </Label>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Q07AnomalyB;