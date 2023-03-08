export const LoginType = {
  Default: 'default',
  Google: 'google',
} as const;

export type LoginType = typeof LoginType[keyof typeof LoginType];
