/**
 * ゲームのクリアタイム計測とランキング管理を担当するモジュール
 */
export class RankingManager {
    private static STORAGE_KEY = 'status_c8_timer_start';
    private static NAME_KEY = 'status_c8_player_name';

    /**
     * プレイヤー名のみを保存します（タイマー開始前用）。
     * @param playerName プレイヤー名
     */
    static setPlayerName(playerName: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.NAME_KEY, playerName);
        }
    }

    /**
     * 計測を開始します。
     * @param playerName プレイヤー名
     */
    static startTimer(playerName: string): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem(this.STORAGE_KEY, Date.now().toString());
            localStorage.setItem(this.NAME_KEY, playerName);
        }
    }

    /**
     * 計測状態をリセット（クリア）します。
     */
    static clearTimer(): void {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }

    /**
     * 現在の経過時間（ミリ秒）を取得します。
     * プレイ中にリアルタイムで表示するために使用します。
     */
    static getElapsedMs(): number | null {
        if (typeof window !== 'undefined') {
            const startTimeStr = localStorage.getItem(this.STORAGE_KEY);
            if (!startTimeStr) return null;
            return Date.now() - parseInt(startTimeStr, 10);
        }
        return null;
    }

    /**
     * 保存されているプレイヤー名を取得します。
     */
    static getPlayerName(): string {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(this.NAME_KEY) || 'Guest';
        }
        return 'Guest';
    }

    /**
     * 計測を停止し、結果（名前とタイム）を返してからクリアします。
     */
    static stopTimer(): { playerName: string, timeMs: number } | null {
        if (typeof window !== 'undefined') {
            const startTimeStr = localStorage.getItem(this.STORAGE_KEY);
            const playerName = this.getPlayerName();
            if (!startTimeStr) return null;

            const timeMs = Date.now() - parseInt(startTimeStr, 10);

            // データのクリア
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem(this.NAME_KEY);

            return { playerName, timeMs };
        }
        return null;
    }

    /**
     * ミリ秒を読みやすい形式（分:秒.ミリ秒）に変換します。
     */
    static formatTime(ms: number): string {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;

        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }

    /**
     * ランキングにスコアを登録します。
     */
    static async submitScore(playerName: string, clearTimeMs: number): Promise<void> {
        console.log(`[Ranking] スコア登録: ${playerName}, タイム: ${this.formatTime(clearTimeMs)}`);
    }
}
