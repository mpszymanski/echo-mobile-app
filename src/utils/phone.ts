export function parsePhone(phone: string) {
  return phone.replace(/\D/g, '');
}