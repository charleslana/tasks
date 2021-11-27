export class Random {
  static generateText(): string {
    return Math.random().toString(36).substring(2);
  }
}
