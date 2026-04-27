import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#dbeafe_0,transparent_40%),radial-gradient(circle_at_80%_80%,#fee2e2_0,transparent_40%)]" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-2xl rounded-3xl border border-neutral-200/70 bg-white/80 p-8 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.3)] backdrop-blur">
          <h1 className="mb-3 text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Status C8
          </h1>
          <p className="mb-8 text-center text-sm text-neutral-600 sm:text-base">
            異変を見つけたら引き返す。異変がなければ進む。
          </p>
          <div className="mx-auto mb-10 w-full max-w-xl">
            <Input
              placeholder="プレイヤー名を入力"
              className="h-12 rounded-xl border-neutral-300 bg-white text-base shadow-sm"
            />
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-10 p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            className="h-12 min-w-32 rounded-xl text-base font-medium"
          >
            引き返す
          </Button>
          <Link href="/game/play">
            <Button className="h-12 min-w-32 rounded-xl bg-neutral-900 text-base font-medium text-white hover:bg-neutral-800">
              次に進む
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
