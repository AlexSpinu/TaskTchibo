export class DataGenerator {
  static generateRandomString(): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const digits = '0123456789';
    const special = '!@#$%^&*';
    const all = upper + lower + digits + special;

    const result = [
      upper[Math.floor(Math.random() * upper.length)],
      lower[Math.floor(Math.random() * lower.length)],
      digits[Math.floor(Math.random() * digits.length)],
      special[Math.floor(Math.random() * special.length)],
    ];

    // Fill remaining 6 characters from the full set
    for (let i = 0; i < 6; i++) {
      result.push(all[Math.floor(Math.random() * all.length)]);
    }

    return result.join('');
  }
}
