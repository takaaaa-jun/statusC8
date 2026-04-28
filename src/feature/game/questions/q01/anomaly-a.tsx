"use client";
import {useState} from 'react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Normal(){
    const [showSuggest, setShowSuggest]=useState(false);
    const [showKairu, setShowKairu]=useState(true);

    const handleClick=()=>{
        setShowSuggest(true);
        setShowKairu(false);
    }

    const handleBlur=()=>{
        setShowSuggest(false);
    }

    return (
    <main>
        <div className="container max-w-2xl mx-auto mt-10 p-6">
        <div className="flex justify-center">
            <img src="/searchlogo.png" alt="Search Logo"/>
        </div>
        <div className="flex justify-center">
            <Input 
                type="search" 
                placeholder="Search..."
                className="w-120"
                onClick={handleClick}
                onBlur={handleBlur} />
            <Button className="w-20">Search</Button>
        </div>
        {showSuggest && (
        <div className="flex justify-center">
            <ul className="list-none border rounded-lg w-120 text-red-500">
                <li className="ml-4">助けて</li>
                <li className="ml-4">助けて</li>
                <li className="ml-4">助けて</li>
            </ul>
            <div className="w-20" />
        </div>
        )}
        <div className="fixed bottom-0 right-0 p-6 z-50">
        
        {showKairu && (
            <div className="">
            <img 
                src="/Kairu.png"
                alt="カイル" 
                className="w-1/10 h-auto fixed bottom-40 right-32"
            />
            </div>
        )}
        </div>
        </div>
    </main>
  );
};