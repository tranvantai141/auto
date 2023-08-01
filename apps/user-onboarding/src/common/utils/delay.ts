/**
 * @description Delay for a number of milliseconds
 * @param ms - Number of milliseconds to delay
 * @returns Promise that resolves after the delay
 * @example
 * await delay(1000);
 * console.log('Hello after 1 second');
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
