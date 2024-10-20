export function formatPhoneNumber(phone: string): string {
  const ddd = phone.slice(0, 2);
  const firstPart = phone.slice(2, 7);
  const secondPart = phone.slice(7, 11);

  return `(${ddd}) ${firstPart}-${secondPart}`;
}
