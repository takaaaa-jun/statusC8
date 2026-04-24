"use client";

import { Button } from "@/components/ui/button";

export default function Home(){
  return (
    <main className="bg-black min-h-screen text-white">
        <div className="container max-w-2xl mx-auto mt-10 p-6">
          <div className="flex justify-center mb-10">
            <img src="/titlelogo.png" alt="Title Logo" />
          </div>
          <div className="text-center p-10">
            <h1>Are you ready?</h1>
          </div>
          <div className="flex justify-center">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              START
            </Button>
          </div>
        </div>
    </main>
  );
};