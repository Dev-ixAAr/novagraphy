export function generateCustomOrderId(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-Digit-Random-Number
  return `NOVA-${dateStr}-${randomNum}`;
}
