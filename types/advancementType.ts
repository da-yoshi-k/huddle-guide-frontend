export const AdvancementType = {
  Good: 0,
  New: 1,
} as const;

export type AdvancementType =
  typeof AdvancementType[keyof typeof AdvancementType];

export function toJapanese(advancement_type: AdvancementType) {
  switch (advancement_type) {
    case AdvancementType.Good:
      return 'Good 👍';
    case AdvancementType.New:
      return 'New 💡';
  }
}
