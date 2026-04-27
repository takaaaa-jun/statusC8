"use client";
import {useState} from 'react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Normal(){
    const [isClicked, setIsClicked]=useState(false);

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
                onClick={()=>setIsClicked(true)} />
            <Button>Search</Button>
        </div>
        {isClicked && (
        <div>
            <ul className="list-none border text-red-600">
                <li>助けて</li>
                <li>助けて</li>
                <li>助けて</li>
            </ul>
        </div>
        )}
        <div className="fixed bottom-0 right-0 p-6 z-50">
        
        <div className="relative group">
          <img 
            src="/Kairu.png"
            alt="カイル" 
            className="w-1/2 h-1/2"
          />
        </div>
        </div>
        </div>
    </main>
  );
};