import { Platform } from "react-native";

interface IOmit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

class HelperManager {
  public static isValid = (param: unknown) => {
    if (
      param === false ||
      param === null ||
      param === undefined ||
      (param instanceof Object && Object.keys(param).length === 0) ||
      (Array.isArray(param) && param.length === 0) ||
      param === "" ||
      Number.isNaN(param)
    ) {
      return false;
    }

    return true;
  };

  public static isValidExtend = (param: unknown) => {
    if (
      param === false ||
      param === null ||
      param === undefined ||
      (param instanceof Date && Number.isNaN(param.getTime())) || // Add this line to check invalid dates
      (!(param instanceof Date) && param instanceof Object && Object.keys(param).length === 0) || // Exclude Date instances from empty object check
      (Array.isArray(param) && param.length === 0) ||
      param === "" ||
      Number.isNaN(param) ||
      param === 0
    ) {
      return false;
    }

    if (typeof param === "string") {
      const date = new Date(param);
      if (Number.isNaN(date.getTime())) {
        // check if date is invalid
        return false;
      }
    }

    return true;
  };

  public static getUniqueItemArr = <T>(value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  };

  public static pickFnc = <T, G extends keyof T>(object: T, keys: G[]): Pick<T, G> => {
    return Object.assign(
      {},
      ...keys.map((key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
          return { [key]: object[key] };
        }
      }),
    );
  };

  public static omitFnc: IOmit = (obj, ...keys) => {
    const rest = {} as {
      [K in keyof typeof obj]: (typeof obj)[K];
    };
    let key: keyof typeof obj;
    for (key in obj) {
      if (!keys.includes(key)) {
        rest[key] = obj[key];
      }
    }
    return rest;
  };

  public static groupBy = <T>(xs: T[], key: keyof T): Record<string, T[]> => {
    return xs.reduce(function (rv: Record<string, T[]>, x: T) {
      (rv[x[key] as string] = rv[x[key] as string] || []).push(x);
      return rv;
    }, {});
  };

  public static hex2rgba = (hex: string, alpha: number): string => {
    hex = hex.replace("#", "");

    const r: number = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    const g: number = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    const b: number = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);

    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  };

  public static containsSpecialChars = (password: string) => {
    // eslint-disable-next-line no-useless-escape
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(password);
  };

  public static isNumeric(value: any) {
    return /^-?\d+$/.test(value);
  }

  public static occurrences(string: string, subString: string, allowOverlapping = false) {
    string += "";
    subString += "";
    if (subString.length <= 0) return string.length + 1;

    let n = 0,
      pos = 0;
    const step = allowOverlapping ? 1 : subString.length;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
        ++n;
        pos += step;
      } else break;
    }
    return n;
  }

  public static wrapArray<T>(arr: T[], max: number): T[][] {
    const subArrays: T[][] = [];
    for (let i = 0; i < arr.length; i += max) {
      subArrays.push(arr.slice(i, i + max));
    }
    return subArrays;
  }

  public static setLocator = (prefix: string, id: string) => {
    return {
      accessible: Platform.OS === "ios",
      accessibilityLabel: `${prefix}-${id}`,
      testID: `${prefix}-${id}`,
    };
  };

  public static removeDuplicates = <T extends object>(originalArray: Array<T>, prop: keyof T) => {
    const newArray: Array<T> = [];
    const lookupObject: Record<string, T> = {};

    for (const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (const u in lookupObject) {
      newArray.push(lookupObject[u]);
    }
    return newArray;
  };
}

export default HelperManager;
