export function omit(obj: Record<never, unknown>, keys: string[]) {
  const newObj = { ...obj };
  keys.forEach((key) => delete (newObj as never)[key]);
  return newObj;
}
