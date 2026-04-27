import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function q02() {

  const PREFECTURES_BY_REGION = {
    "ほっかいどー・とーほく": ["ほっかいどー", "あおもりけん", "いわてけん", "みやぎけん", "あきたけん", "やまがたけん", "ふくしまけん"],
    "かんとー": ["いばらきけん", "とちぎけん", "ぐんまけん", "さいたまけん", "ちばけん", "とーきょーと", "かながわけん"],
    "ちゅーぶ": ["にーがたけん", "とやまけん", "いしかわけん", "ふくいけん", "やまなしけん", "ながのけん", "ぎふけん", "しずおかけん", "あいちけん"],
    "きんき": ["みえけん", "しがけん", "きょーとふ", "おーさかふ", "ひょーごけん", "ならけん", "わかやまけん"],
    "ちゅーごく・しこく": ["とっとりけん", "しまねけん", "おかやまけん", "ひろしまけん", "やまぐちけん", "とくしまけん", "かがわけん", "えひめけん", "こーちけん"],
    "九州・沖縄": ["ふくおかけん", "さがけん", "ながさきけん", "くまもとけん", "おーいたけん", "みやざきけん", "かごしまけん", "おきなわけん"],
  };

  return (
    <main>
    <div className="text-center pb-4">
        <h4>都道府県を選択してください。</h4>
    </div>

    <div className="flex justify-center">
    <Select>
      <SelectTrigger className="w-full max-w-64">
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(PREFECTURES_BY_REGION).map(([region, prefs]) => (
          <SelectGroup key={region}>
          <SelectLabel>{region}</SelectLabel>
          {prefs.map((pref) => (
            <SelectItem key={pref} value={pref}>
              {pref}
            </SelectItem>
        ))}
      </SelectGroup>
      ))}
      </SelectContent>
    </Select>
    </div>
    </main>
  )
}
