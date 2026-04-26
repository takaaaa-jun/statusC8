"use client"
import React from "react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"

export default function CAPTCHA(){

    const [inputValue, setInputValue] = useState("");
    const [showMismatchError, setShowMismatchError] = useState(false);
    const [showCheckError, setShowCheckError] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [theModerator, setTheModerator] = useState(false);
    const word = "4D5BS8"

    const handleSend = () => {
        const isMatched = inputValue === word;

        if(!isChecked){
            setShowCheckError(true);
            setShowMismatchError(false);
            return;
        }

        if(!isMatched){
            setShowMismatchError(true);
            setShowCheckError(false);
            return;
        }
    }

    return (
        <main>
            <div className="flex justify-center py-5">
                <h3>人間であることを証明してください</h3>
            </div>
            <div className="flex justify-center py-5">
                <img src="/captcha.png" alt="image" className="w-60"></img>
            </div>
            <div className="flex justify-center">
                <Field className="w-100 py-5">
                    <FieldLabel htmlFor="input-field-username">
                        上記の文字を入力してください
                    </FieldLabel>
                    <Input
                        id="input-field-username"
                        type="text"
                        placeholder=""
                        value={inputValue} 
                        onChange={(e) => {
                                 setInputValue(e.target.value);
                                 if(showMismatchError||showCheckError){
                                    setShowMismatchError(false);
                                    setShowCheckError(false);
                                }
                                    
                        }}
                    />
                    <FieldDescription>
                        使用できる文字は数字および大文字アルファベットです
                    </FieldDescription>
                </Field>
            </div>
            <div className="flex justify-center pb-5">
            {showCheckError && (
                <Alert variant="destructive" className="max-w-md">
                    <AlertCircleIcon />
                    <AlertTitle>再試行</AlertTitle>
                    <AlertDescription>
                    チェックボックスにチェックしてください。
                    </AlertDescription>
            </Alert>
            )}

            {showMismatchError && (
                <Alert variant="destructive" className="max-w-md">
                    <AlertCircleIcon />
                    <AlertTitle>再試行</AlertTitle>
                    <AlertDescription>
                    入力された文字列は間違っています。再入力してください。
                    </AlertDescription>
                </Alert>
            )}
            </div>

            {/* チェックボックス */}
            <FieldGroup className="mx-auto w-56">
                <Field orientation="horizontal">
                    <Checkbox id="terms-checkbox-basic" name="terms-checkbox-basic"
                    onCheckedChange={(checked) => {
                            const val = !!checked;
                            setIsChecked(val);
                            setTheModerator(val);
                            if(val){
                                setShowCheckError(false);
                            }
                    }} />
                    <FieldLabel htmlFor="terms-checkbox-basic">
                        私はロボットではありません
                    </FieldLabel>
                </Field>
            </FieldGroup>
            <div className="flex justify-center pt-5">
                {theModerator && (
                <div className="flex items-center text-[#d32f2f] border border-[#d32f2f] rounded-md text-sm px-3 py-1">
                    <svg className="w-5 h-5 mr-3" 
                         xmlns="http://www.w3.org/2000/svg" 
                         fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
  
                    <div className="leading-relaxed">
                        なんかそういうデータあるんすか？
                    </div>
                </div>
            )}
            </div>
            <div className="flex justify-center pt-5">
                <Button onClick={handleSend}>
                    確認
                </Button>
            </div>
        </main>
    );
};