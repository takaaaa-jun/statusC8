import React from 'react';

import { Search, SearchIcon, UserCircle } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCard } from "@/components/ui/usercard";
import { Textarea } from "@/components/ui/textarea"
import { PostCard } from "@/components/ui/postcard"
import { Bell, Home, Mail } from "lucide-react"

export default function q08(){
    return (
        <main className="bg-muted">
            <header className="w-full border-b bg-white px-4 h-16">
            <div className="mx-auto max-w-7xl grid grid-cols-3 items-center">
        
            {/* 左側：ナビゲーションリンク */}
            <Tabs defaultValue="overview">
                <TabsList variant="line">
                    <TabsTrigger value="overview"><Home className="size={24}" />ホーム</TabsTrigger>
                    <TabsTrigger value="analytics"><Bell className="h-4 w-4" />通知</TabsTrigger>
                    <TabsTrigger value="reports"> <Mail className="size={24}" />メッセージ</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* 中央：ロゴ */}
            <div className="flex justify-center">
                <a href="#">
                    <img className="h-16 translate-y-2" src="/logo.png" alt="logo" />
                </a>
            </div>

            {/* 右側：検索ボックスとアイコン (右から順に配置) */}
            <div className="flex flex-row-reverse items-center gap-4">

            {/* 右から2番目：検索ボックス */}
            <div className="relative">
                <ButtonGroup>
                    <Input placeholder="キーワード検索" />
                    <Button variant="outline" aria-label="Search">
                        <SearchIcon />
                    </Button>
                </ButtonGroup>
            </div>
            </div>
        </div>
        </header>

        <div className="flex">
            <div className="flex w-[20%] hidden md:block w-[30%] shrink-0">
                <UserCard 
                    userName="ユーザ" 
                    userId="a" 
                    headerUrl="/header.png" 
                    iconUrl="/user_icon.png" 
                    followingCount="445"
                    followerCount="334"
                    statusMessage='ステータスメッセージ'
                />
            </div>

            {/* メイン */}
            <div className="w-[40%] py-4 pr-4">
                {/* テキストエリア */}
                <div className="grid gap-2">
                    <Textarea placeholder="What are you doing now?" className="bg-white"/>
                    <Button>Send message</Button>
                </div>
                {/* ポストエリア */}
                <div className="flex-col pt-2">
                    <PostCard
                    userName="サトウ | カフェ巡りと暮らし"
                    badge = "/badge.png"
                    userId="sugar_life_03"
                    time="10分"
                    content="大判焼きなんだよなあ"
                    iconUrl="/icon01.jpg"
                    replies = "22"
                    reposts = "120"
                    likes = "975"
                    />
                </div>
                <div className="flex-col pt-2">
                    <PostCard
                    userName="たっくん@趣味垢"
                    userId="taku_hobby_v8"
                    badge = "/badge.png"
                    time="15分"
                    content="✖昼間でも気を付けて運転しなければならない"
                    iconUrl="/icon02.jpg"
                    replies = "990"
                    reposts = "1M"
                    likes = "15M"
                    />
                </div>
                <div className="flex-col pt-2">
                    <PostCard
                    userName="ねむい"
                    userId="nemui_zzz_99"
                    badge = "/badge.png"
                    time="15分"
                    content="今日は晴れですね
                    晴れといえば僕の誕生日は来月だけど君はお肉が好き？"
                    iconUrl="/icon03.jpg"
                    replies = "1"
                    reposts = "2"
                    likes = "100M"
                    />
                </div>
                <div className="flex-col pt-2">
                    <PostCard
                    userName="ん"
                    userId="qRtk984"
                    badge = "/badge.png"
                    time="15分"
                    content="TOEICは5点刻みだボケ"
                    iconUrl="/dqn.png"
                    replies = "1"
                    reposts = "50M"
                    likes = "2"
                    />
                </div>
            </div>
            <div className="flex-1 py-4 pr-4">
                <div className="w-full overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-left border-separate border-spacing-0">
                    <thead className="bg-white">
                        <tr>
                            <th className="px-4 py-3 text-gray-700 border-b border-gray-200">トレンド</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-lg bg-white">
                        <tr>
                            <td className="px-4 py-3">#サポーターズ</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">#技育CAMP</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3">#ハッカソン</td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
        </main>
    );
};