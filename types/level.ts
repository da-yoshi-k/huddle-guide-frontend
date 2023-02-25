export const Level = {
  General: 0,
  Ordinary: 1,
  Like: 2,
  Love: 3,
  Novice: 4,
  Casual: 5,
  Hardcore: 6,
  Entry: 7,
  Amateur: 8,
  Professional: 9,
} as const;

export type Level = typeof Level[keyof typeof Level];

export function toJapanese(level: Level) {
  switch (level) {
    case Level.General:
      return '-';
    case Level.Ordinary:
      return '普通';
    case Level.Like:
      return '好き';
    case Level.Love:
      return '大好き';
    case Level.Novice:
      return 'にわか';
    case Level.Casual:
      return 'カジュアル';
    case Level.Hardcore:
      return 'ガチ';
    case Level.Entry:
      return 'エントリー';
    case Level.Amateur:
      return 'アマチュア';
    case Level.Professional:
      return 'プロ';
  }
}
