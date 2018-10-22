export function phoneTest(phone) {
  return phone.length === 11 && /^1(1|2|3|4|5|6|7|8|9)\d{9}$/.test(phone);
}
