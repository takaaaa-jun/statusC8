"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  userName: string
  userId: string
  iconUrl?: string
  headerUrl?: string
  statusMessage?: string
  // フォロー・フォロワー数を追加
  followingCount?: string
  followerCount?: string
}

function UserCard({
  className,
  userName,
  userId,
  iconUrl,
  headerUrl,
  statusMessage,
  followingCount,
  followerCount,
  ...props
}: UserCardProps) {
  return (
    <div className={cn("w-full  shrink-0 ", className)} {...props}>
      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm">
        {/* ヘッダー画像 */}
        <div className="h-24 w-full bg-muted">
          {headerUrl && (
            <img
              src={headerUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* コンテンツエリア */}
        <div className="relative px-4 pt-12 pb-4">
          {/* アイコン */}
          <div className="absolute -top-10 left-4">
            <div className="h-20 w-20 overflow-hidden rounded-lg border-4 border-background bg-muted shadow-sm">
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground text-2xl font-bold">
                  {userName.charAt(0)}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* ユーザー情報 + フォロー/フォロワー数 */}
            <div className="flex flex-col gap-2 border-b pb-3 border-border">
              <div className="flex flex-col gap-0.5">
                <h3 className="text-lg font-bold leading-none tracking-tight">
                  {userName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{userId}
                </p>
              </div>

              {/* フォロー / フォロワー数表示 */}
              <div className="flex gap-4 items-center">
                <div className="flex gap-1 items-baseline">
                  <span className="text-sm font-bold">{followingCount}</span>
                  <span className="text-xs text-muted-foreground">フォロー中</span>
                </div>
                <div className="flex gap-1 items-baseline">
                  <span className="text-sm font-bold">{followerCount}</span>
                  <span className="text-xs text-muted-foreground">フォロワー</span>
                </div>
              </div>
            </div>

            {/* ステータスメッセージ */}
            {statusMessage && (
              <div className="text-sm text-foreground/90 line-clamp-2 min-h-[2.5rem]">
                {statusMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { UserCard }