export function omit<T extends Record<never, unknown>>(
  obj: T,
  keys: string[],
): Omit<T, keyof typeof keys> {
  const newObj = { ...obj };
  keys.forEach((key) => delete (newObj as never)[key]);
  return newObj;
}
