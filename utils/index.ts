export function extraNumber(value: string): number {
  return value.replace(/\D/g, '') as unknown as number;
}
