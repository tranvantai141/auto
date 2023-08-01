import { compareString } from '../compareString';

describe('compareString', () => {
  it('should return true when two strings are the same', () => {
    expect(compareString('abc', 'abc')).toBe(true);
  });

  it('should return true when two strings are the same with ignoreCase option', () => {
    expect(compareString('abc', 'ABC', { ignoreCase: true })).toBe(true);
  });

  it('should return false when two strings are not the same', () => {
    expect(compareString('abc', 'abc ')).toBe(false);
  });

  it('should return true when two strings are the same with trim option', () => {
    expect(compareString('abc', 'abc', { trim: true })).toBe(true);
  });

  it('should return false when two strings are not the same with ignoreSpace option', () => {
    expect(compareString('abc', 'a b c')).toBe(false);
  });

  it('should return true when two strings are the same with ignoreSpace option', () => {
    expect(compareString('abc', 'abc', { ignoreSpace: true })).toBe(true);
  });

  it('should return false when two strings are not the same with ignoreSpecialChar option', () => {
    expect(compareString('abc', 'a!b@c#')).toBe(false);
  });

  it('should return true when two strings are the same with ignoreSpecialChar option', () => {
    expect(compareString('abc', 'abc', { ignoreSpecialChar: true })).toBe(true);
  });

  it('should return false when two strings are not the same with ignoreVietnameseAccent option', () => {
    expect(compareString('abc', 'ábc')).toBe(false);
  });

  it('should return true when two strings are the same with ignoreVietnameseAccent option', () => {
    expect(compareString('abc', 'ábc', { ignoreVietnameseAccent: true })).toBe(true);
  });
});
