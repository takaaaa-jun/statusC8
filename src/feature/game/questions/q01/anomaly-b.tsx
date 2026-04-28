"use client";
import {useState} from 'react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Normal(){
    return (
    <main>
        <div className="container max-w-2xl mx-auto mt-10 p-6">
        <div className="flex justify-center">
            <img src="/searchlogo.png" alt="Search Logo"/>
        </div>
        <div className="flex justify-center">
            <Input
                className="opacity-0"
                type="search" 
                placeholder="Search..."
            />
            <Button>Search</Button>
        </div>
        
        <div className="fixed bottom-0 right-0 p-6 z-50">
        
        </div>
        </div>
    </main>
  );
};