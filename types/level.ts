export const Level = {
  General: 0,
  Beginner: 1,
  Casual: 2,
  Professional: 3,
  Hardcore: 4,
} as const;

export type Level = typeof Level[keyof typeof Level];

export function toJapanese(level: Level) {
  switch (level) {
    case Level.General:
      return '-';
    case Level.Casual:
      return 'ライト';
    case Level.Beginner:
      return '初心者';
    case Level.Professional:
      return 'プロ';
    case Level.Hardcore:
      return 'ガチ';
  }
}
