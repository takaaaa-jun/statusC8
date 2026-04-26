/**
 * ゲームのクリアタイム計測とランキング管理を担当するモジュール
 */
export class RankingManager {
    private static STORAGE_KEY = 'status_c8_timer_start';

    /**
     * 計測を開始します。
     * ブラウザのlocalStorageに現在時刻を保存します。
     */
    static startTimer(): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.STORAGE_KEY, Date.now().toString());
        }
    }

    /**
     * 計測を停止し、開始時からの経過時間（ミリ秒）を取得します。
     * @returns 経過時間（ミリ秒）。開始時刻が取得できない場合はnull。
     */
    static stopTimer(): number | null {
        if (typeof window !== 'undefined') {
            const startTimeStr = localStorage.getItem(this.STORAGE_KEY);
            if (!startTimeStr) return null;

            const startTime = parseInt(startTimeStr, 10);
            const endTime = Date.now();

            // 次の計測のためにクリア
            localStorage.removeItem(this.STORAGE_KEY);

            return endTime - startTime;
        }
        return null;
    }

    /**
     * ミリ秒を読みやすい形式（分:秒.ミリ秒）に変換します。
     * @param ms 経過時間（ミリ秒）
     */
    static formatTime(ms: number): string {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;

        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }

    /**
     * ランキングにスコアを登録します。
     * 将来的にデータベース（Prismaなど）への保存ロジックを追加する場所です。
     * @param playerName プレイヤー名
     * @param clearTimeMs クリアタイム（ミリ秒）
     */
    static async submitScore(playerName: string, clearTimeMs: number): Promise<void> {
        // TODO: ここにDB保存ロジックを実装
        console.log(`[Ranking] スコア登録: ${playerName}, タイム: ${this.formatTime(clearTimeMs)}`);

        // 例: await prisma.ranking.create({ data: { name: playerName, time: clearTimeMs } });
    }
}
