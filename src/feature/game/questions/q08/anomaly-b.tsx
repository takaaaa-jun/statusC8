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
                    <img className="" src="/logo-5.png" alt="logo" />
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
                    followingCount="101,006"
                    followerCount="0"
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
                    userName="✨ 𝓚𝓘𝓡𝓐 ✨"
                    badge = "/badge.png"
                    userId="kira_shiny_x"
                    time="10分"
                    content="これは本当に素晴らしいニュースです！ 😭😭😭🙌🙌🙌✨✨✨ 応援しています！！ 🚀🚀🚀"
                    iconUrl="/zombie01.png"
                    replies = "22"
                    reposts = "120"
                    likes = "975"
                    />
                </div>
                <div className="flex-col pt-2">
                    <PostCard
                    userName="Breaking-News"
                    userId="news_shocker"
                    badge = "/badge.png"
                    time="15分"
                    content="【衝撃】これは凄すぎる…！！一体どうなっているんだ？ 😱😱😱 詳細はプロフィールをチェックしてください 👇👇"
                    iconUrl="/zombie02.png"
                    replies = "990"
                    reposts = "1M"
                    likes = "15M"
                    />
                </div>
                <div className="flex-col pt-2">
                    <PostCard
                    userName="𝑺𝒎𝒊𝒍𝒆 😊"
                    userId="smile_power_01"
                    badge = "/badge.png"
                    time="15分"
                    content="私はこれがとても好きです。非常に興味深い。あなたはこれについてどう思いますか？私はあなたの返事を楽しみにしています。✅✅"
                    iconUrl="/zombie03.jpg"
                    replies = "1"
                    reposts = "2"
                    likes = "100M"
                    />
                </div>
                <div className="flex-col pt-2">
                    <PostCard
                    userName="𝑱𝒖𝒏𝒊𝒐𝒓 ✨"
                    userId="junior_vibe99"
                    badge = "/badge.png"
                    time="20分"
                    content="大丈夫？ 人谷羽平 ホームラン 総理  最高の瞬間ですね！🙏✨✨ #拡散希望 #相互フォロー "
                    iconUrl="/zombie04.jpg"
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