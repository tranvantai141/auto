import { removeVietnameseAccent } from './removeVietnameseAccent';

export type CompareStringOptions = {
  ignoreCase?: boolean;
  trim?: boolean;
  ignoreSpace?: boolean;
  ignoreSpecialChar?: boolean;
  ignoreVietnameseAccent?: boolean;
};

/**
 * Compare two strings
 * @param str1: string
 * @param str2: string
 * @param options: CompareStringOptions
 * @returns boolean
 * @example
 * compareString('abc', 'abc') // true
 * compareString('abc', 'ABC', { ignoreCase: true }) // true
 * compareString('abc', 'abc ') // false
 * compareString('abc', 'abc', { trim: true }) // true
 * compareString('abc', 'a b c') // false
 * compareString('abc', 'abc', { ignoreSpace: true }) // true
 * compareString('abc', 'a!b@c#') // false
 * compareString('abc', 'abc', { ignoreSpecialChar: true }) // true
 */
export function compareString(str1: string, str2: string, options?: CompareStringOptions) {
  if (options?.ignoreCase) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
  }

  if (options?.trim) {
    str1 = str1.trim();
    str2 = str2.trim();
  }

  if (options?.ignoreSpace) {
    str1 = str1.replace(/\s/g, '');
    str2 = str2.replace(/\s/g, '');
  }

  if (options?.ignoreSpecialChar) {
    // remove special characters except vietnamese characters
    str1 = str1.replace(/[^\w\s\u00C0-\u1EF9]/gi, '');
    str2 = str2.replace(/[^\w\s\u00C0-\u1EF9]/gi, '');
  }

  if (options?.ignoreVietnameseAccent) {
    // remove vietnamese accent
    str1 = removeVietnameseAccent(str1);
    str2 = removeVietnameseAccent(str2);
  }

  return str1 === str2;
}
