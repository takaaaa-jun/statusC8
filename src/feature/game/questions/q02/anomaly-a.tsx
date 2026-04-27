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
  "هوكايدو وتوهوكو": ["هوكايدو", "آوموري", "إيواتيه", "مياغي", "أكيتا", "ياماغاتا", "فوكوشيما"],
  "كانتو": ["إيباراكي", "توتشيغي", "غونما", "سايتاما", "تشيبا", "طوكيو", "كاناغاوا"],
  "تشوبو": ["نييغاتا", "توياما", "إيشيكاوا", "فوكوي", "ياماناشي", "ناغانو", "غيفو", "شيزوكا", "آيتشي"],
  "كينكي": ["مييه", "شيغا", "كيوتو", "أوساكا", "هيوغو", "نارا", "واكاياما"],
  "تشوغوكو وشيكوكو": ["توتوري", "شيمانيه", "أوكاياما", "هيروشيما", "ياماغوتشي", "توكوشيما", "كاغاوا", "إهيميه", "كوتشي"],
  "كيوشو وأوكيناوا": ["فوكوكا", "ساغا", "ناغاساكي", "كوماموتو", "أويتا", "ميازاكي", "كاغوشيما", "أوكيناوا"],
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
