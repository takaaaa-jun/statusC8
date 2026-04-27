"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string
  userId: string
  time: string
  content: string
  iconUrl?: string
  replies?: number | string
  reposts?: number | string
  likes?: number | string
  badge?: string
}

function PostCard({
  className,
  userName,
  userId,
  time,
  content,
  iconUrl,
  replies = 0,
  reposts = 0,
  likes = 0,
  badge,
  ...props
}: PostCardProps) {
  // コンポーネント内で分割処理を行う
  const parts = content.split(/(#[^\s]+\s)/g);

  return (
    <div className={cn("", className)} {...props}>
      <div className="rounded-xl border bg-card text-card-foreground shadow-sm transition-colors hover:bg-accent/5 p-4">
        <div className="flex gap-3">
          
          {/* アイコンエリア */}
          <div className="flex-shrink-0">
            <div className="h-12 w-12 overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
              {iconUrl ? (
                <img src={iconUrl} alt={userName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground text-sm font-bold">
                  {userName ? userName.charAt(0) : ""}
                </div>
              )}
            </div>
          </div>

          {/* コンテンツエリア */}
          <div className="flex flex-col w-full min-w-0 gap-1">
            
            {/* ヘッダー: ユーザー名 / ID / 時間 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 leading-none overflow-hidden text-ellipsis">
                <span className="font-bold tracking-tight text-[15px] truncate">{userName}</span>
                <span className="text-sm text-muted-foreground truncate shrink">@{userId}</span>
                {badge && (
                  <div className="rounded-lg w-4 h-4 overflow-hidden shrink-0">
                    <img src={badge} alt="badge" className="h-full w-full object-cover" />
                  </div>
                )}
                <span className="text-sm text-muted-foreground whitespace-nowrap shrink-0">{time}</span>
              </div>
              
              <button className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
              </button>
            </div>

            {/* 本文 */}
            <div className="text-[15px] leading-relaxed text-foreground/90 mt-0.5 whitespace-pre-wrap break-words">
              {parts.map((part, i) => {
                if (part.startsWith('#') && part.endsWith(' ')) {
                  return (
                    <span key={i} className="text-blue-500 font-medium">
                      {part}
                    </span>
                  );
                }
                return part;
              })}
            </div>

            {/* アクションボタンエリア */}
            <div className="flex items-center justify-between mt-3 max-w-[280px]">
              {/* 返信 */}
              <button className="group flex items-center gap-1.5 text-muted-foreground hover:text-blue-500 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-blue-500/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <span className="text-xs font-medium">{replies}</span>
              </button>

              {/* リポスト */}
              <button className="group flex items-center gap-1.5 text-muted-foreground hover:text-emerald-500 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-emerald-500/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
                </div>
                <span className="text-xs font-medium">{reposts}</span>
              </button>

              {/* お気に入り */}
              <button className="group flex items-center gap-1.5 text-muted-foreground hover:text-amber-500 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-amber-500/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </div>
                <span className="text-xs font-medium">{likes}</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export { PostCard }