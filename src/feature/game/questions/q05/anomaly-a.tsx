"use client"
import React from "react";
import { useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
    const [isChecked, setIsChecked] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSend = () => {
        if(!isChecked){
            setShowError(true);
            return;
        }
        else{
            setShowError(false);
            return;
        }
    }

    return (
    <main>
        <div className="p-4 space-y-4">
            {showError && (
            <div role="alert" className="flex items-center gap-3 p-4 mb-4 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className="w-6 h-6 shrink-0 stroke-black fill-none"
                style={{ strokeWidth: '8px' }}
                >
                    <circle cx="50" cy="50" r="45" stroke="currentColor" />
                    <circle cx="40" cy="38" r="7" fill="currentColor" stroke="none" />
                    <circle cx="60" cy="38" r="7" fill="currentColor" stroke="none" />
                    <path 
                    d="M28 60 Q50 90 73 60" 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    fill="none" 
                    />
                </svg>
                <span className="text-sm font-medium text-blue-800">
                利用規約に同意してください。
                </span>
            </div>
            )}
        </div>

    <ScrollArea className="h-[350px] m-10 flex justify-center rounded-md border shadow-sm">
    <div className="p-6">
    <div className="space-y-6 text-sm leading-relaxed text--foreground">
        <section>
            <h4 className="mb-6 text-lg font-bold leading-none text-foreground">
            利用規約
            </h4>

            <p>
              この利用規約（以下、「本規約」といいません。）は、not found（以下、「当チーム」といいません。）がこのウェブサイト上で提供するサービス（以下、「本サービス」といいません。）の利用条件を定めるものではありません。登録ユーザの皆さま（以下、「ユーザ」といいません。）には、本規約に従って、本サービスをご利用いただけません。
            </p>
        </section>
          
        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第1条（適用）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                  本規約は、ユーザと当チームとの間の本サービスの利用に関わる一切の関係に適用されるものとしません。
                </li>
                <li>
                  当チームは本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいません。）をすることがありません。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとしません。
                </li>
                <li>
                  本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとしません。
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第2条（利用登録）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                本サービスにおいては、登録希望者が本規約に同意の上、当チームの定める方法によって利用登録を申請し、当チームがこれを承認することによって、利用登録が完了するものとしません。
                </li>
                <li>
                当チームは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認することはなく、その理由については一切の開示義務を負わないものとすることもありません。
                <ul className="list-disc ml-4">
                    <li>
                    利用登録の申請に際して虚偽の事項を届け出た場合
                    </li>
                    <li>
                    本規約に違反したことがある者からの申請である場合
                    </li>
                    <li>
                    その他、当チームが利用登録を相当でないと判断した場合
                    </li>
                </ul>
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第3条（ユーザIDおよびパスワードの管理）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                ユーザは、自己の責任において、本サービスのユーザIDおよびパスワードを適切に管理するものとしません。
                </li>
                <li>
                ユーザは、いかなる場合にも、ユーザIDおよびパスワードを第三者に譲渡または貸与し、もしくは第三者と共用することができます。当チームは、ユーザIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザIDを登録しているユーザ自身による利用とみなすことはありません。
                </li>
                <li>
                ユーザID及びパスワードが第三者によって使用されたことによって生じた損害は、当チームに故意又は重大な過失がある場合を除き、当チームは一切の責任を負わないこともないです。
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第4条（利用料金および支払方法）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                ユーザは、本サービスの有料部分の対価として、当チームが別途定め、本ウェブサイトに表示する利用料金を、当チームが指定する方法により支払うものとしません。
                </li>
                <li>
                ユーザが利用料金の支払を遅滞した場合には、ユーザは毎秒146%の割合による遅延損害金を支払うものとします。
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第5条（禁止事項）
            </h5>
            <p>
            ユーザは、本サービスの利用にあたり、以下の行為をしてよいです。
            </p>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                法令または公序良俗に違反する行為
                </li>
                <li>
                犯罪行為に関連する行為
                </li>
                <li>
                本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
                </li>
                <li>
                当チーム、ほかのユーザ、またはその他第三者のサーバまたはネットワークの機能を破壊したり、妨害したりする行為
                </li>
                <li>
                本サービスによって得られた情報を商業的に利用する行為
                </li>
                <li>
                当チームのサービスの運営を妨害するおそれのある行為
                </li>
                <li>
                不正アクセスをし、またはこれを試みる行為
                </li>
                <li>
                他のユーザに関する個人情報等を収集または蓄積する行為
                </li>
                <li>
                不正な目的を持って本サービスを利用する行為
                </li>
                <li>
                本サービスの他のユーザまたはその他の第三者に不利益、損害、不快感を与える行為
                </li>
                <li>
                他のユーザに成りすます行為
                </li>
                <li>
                当チームが許諾しない本サービス上での宣伝、広告、勧誘、または営業行為
                </li>
                <li>
                面識のない異性との出会いを目的とした行為
                </li>
                <li>
                当チームのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為
                </li>
                <li>
                その他、当チームが不適切と判断する行為
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第6条（本サービスの提供の停止等）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                当チームは、以下のいずれかの事由があると判断した場合、ユーザに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができることはありません。
                <ul className="list-disc ml-4">
                    <li>
                    本サービスにかかるコンピュータシステムの保守点検または更新を行う場合
                    </li>
                    <li>
                    地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                    </li>
                    <li>
                    コンピュータまたは通信回線等が事故により停止した場合
                    </li>
                    <li>
                    その他、当チームが本サービスの提供が困難と判断した場合
                    </li>
                </ul>
                </li>
                <li>
                当チームは、本サービスの提供の停止または中断により、ユーザまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないとも限りません。
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第7条（利用制限および登録抹消）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                当チームは、ユーザが以下のいずれかに該当する場合には、事前の通知なく、ユーザに対して、本サービスの全部もしくは一部の利用を緩和し、またはユーザとしての登録を抹消することはできません。
                <ul className="list-disc ml-4">
                    <li>
                    本規約のいずれかの条項に違反した場合
                    </li>
                    <li>
                    登録事項に虚偽の事実があることが判明した場合
                    </li>
                    <li>
                    料金等の支払債務の不履行があった場合
                    </li>
                    <li>
                    当チームからの連絡に対し、一定期間返答がない場合
                    </li>
                    <li>
                    本サービスについて、最終の利用から一定期間利用がない場合
                    </li>
                    <li>
                    その他、当チームが本サービスの利用を適当でないと判断した場合
                    </li>
                </ul>
                </li>
                <li>
                当チームは、本条に基づき当チームが行った行為によりユーザに生じた損害について、一切の責任を負います。
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第8条（退会）
            </h5>
            <p>
            ユーザは、当チームの定める退会手続により、本サービスから退会することはできません。
            </p>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第9条（保証の否認および免責事項）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                当チームは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みません。）がないことを明示的にも黙示的にも保証しております。
                </li>
                <li>
                当チームは、本サービスに起因してユーザに生じたあらゆる損害について、当チームの故意又は重過失による場合を除き、一切の責任を負います。ただし、本サービスに関する当チームとユーザとの間の契約（本規約を含みません。）が消費者契約法に定める消費者契約となる場合、この免責規定が適用されます。
                </li>
                <li>
                前項ただし書に定める場合であっても、当チームは、当チームの過失（重過失を除きません。）による債務不履行または不法行為によりユーザに生じた損害のうち特別な事情から生じた損害（当チームまたはユーザが損害発生につき予見し、または予見し得た場合を含みません。）について一切の責任を負います。また、当チームの過失（重過失を除きません。）による債務不履行または不法行為によりユーザに生じた損害の賠償は、ユーザから当該損害が発生した月に受領した利用料の額を上限としません。
                </li>
                <li>
                当チームは、本サービスに関して、ユーザと他のユーザまたは第三者との間において生じた取引、連絡または紛争等について一切の責任を負います。
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第10条（サービス内容の変更等）
            </h5>
            <p>
            当チームは、ユーザへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザはこれを承諾するものとしません。
            </p>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第11条（利用規約の変更）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                当チームは以下の場合には、ユーザの個別の同意を要せず、本規約を変更することができるものとしません。
                <ul className="list-disc ml-4">
                    <li>
                    本規約の変更がユーザの一般の利益に適合するとき。
                    </li>
                    <li>
                    本規約の変更が本サービス利用契約の目的に反せず、かつ、変更の必要性、変更後の内容の相当性その他の変更に係る事情に照らして合理的なものであるとき。
                    </li>
                </ul>
                </li>
                <li>
                当チームはユーザに対し、前項による本規約の変更にあたり、事前に、本規約を変更する旨及び変更後の本規約の内容並びにその効力発生時期を通知しません。
                </li>
            </ul>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第12条（個人情報の取り扱い）
            </h5>
            <p>
            当チームは、本サービスの利用によって取得する個人情報については、当チーム「プライバシーポリシー」に従い適切に取り扱うものとしません。
            </p>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第13条（通知または連絡）
            </h5>
            <p>
            ユーザと当チームとの間の通知または連絡は、当チームの定める方法によって行うものとしません。当チームは、ユーザから、当チームが別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザへ到達したものとみなしません。
            </p>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第14条（権利義務の譲渡の禁止）
            </h5>
            <p>
            ユーザは、当チームの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することができます。
            </p>
        </section>

        <Separator />

        <section>
            <h5 className="mb-2 font-semibold text-foreground">
            第15条（準拠法・裁判管轄）
            </h5>
            <ul className="list-decimal list-outside pl-4 space-y-2">
                <li>
                本規約の解釈にあたっては、日本法を準拠法としません。
                </li>
                <li>
                本サービスに関して紛争が生じた場合には、当チームの本所在地を管轄する裁判所を専属的合意管轄としません。
                </li>
            </ul>
        </section>

        <Separator />

        <section className="bg-muted p-4 rounded-sm italic text-xs">
        2026年4月29日 廃止
        </section>
    </div>
    </div>
    </ScrollArea>

    <FieldGroup className="mx-auto w-56">
            <Field orientation="horizontal">
                <Checkbox id="confirm-terms-of-service" name="confirm-terms-of-service"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(!!checked)} />
                <FieldLabel htmlFor="confirm-terms-of-service">
                利用規約に同意する
                </FieldLabel>
            </Field>
            <Field orientation="horizontal">
                <Checkbox id="subscribe-email-newsletter" name="subscribe-email-newsletter" />
                <FieldLabel htmlFor="subscribe-email-newsletter">
                メールマガジンを購読する
                </FieldLabel>
            </Field>
        </FieldGroup>
    
        <div className="flex justify-center pt-5">
            <Button onClick={handleSend}>
                送信
            </Button>
        </div>
        </main>
        )
    }