import RegOptions from '@skeleton-app/sdk-managers/models';
import parsePhoneNumber, { CountryCode, PhoneNumber } from 'libphonenumber-js';
import { Platform } from 'react-native';

interface IOmit {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

class HelperManager {
  public static checkInvalidity = (param: unknown) => {
    if (
      param === false ||
      param === null ||
      param === undefined ||
      (param instanceof Object && Object.keys(param).length === 0) ||
      (Array.isArray(param) && param.length === 0) ||
      param === '' ||
      Number.isNaN(param)
    ) {
      return true;
    }

    return false;
  };

  public static getUniqueItemArr = <T>(value: T, index: number, self: T[]) => {
    return self.indexOf(value) === index;
  };

  public static groupBy = <T>(list: T[], keyGetter: Function) => {
    const map = new Map();
    list.forEach((item: T) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  };

  public static pickFnc = <T, G extends keyof T>(
    object: T,
    keys: G[]
  ): Pick<T, G> => {
    return Object.assign(
      {},
      ...keys.map((key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
          return { [key]: object[key] };
        }
      })
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

  public static removeDuplicates = <T extends Object>(
    originalArray: T[],
    prop: keyof T
  ) => {
    const newArray = [];
    const lookupObject: any = {};

    for (const i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (const u in lookupObject) {
      newArray.push(lookupObject[u]);
    }
    return newArray;
  };

  public static groupByV2 = <T>(xs: T[], key: keyof T) => {
    return xs.reduce(function (rv: any, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  public static isValid = (input: string, conditions: Array<RegExp>) => {
    if (HelperManager.checkInvalidity(input)) return false;
    return conditions.every((c) => !!c.test(input.trim()));
  };

  public static validateEmail = (email: string) => {
    return RegOptions.email.exec(String(email)?.toLowerCase());
  };

  public static isValidPhoneNumber = (
    input: string,
    country: CountryCode
  ): boolean => {
    const phoneNumber = parsePhoneNumber(input, country);
    if (HelperManager.checkInvalidity(phoneNumber)) {
      return false;
    }

    return (phoneNumber as PhoneNumber).isValid() === true;
  };

  public static setLocator = (prefix: string, id: string) => {
    const testID = `${prefix}-${id}`;
    if (Platform.OS === 'ios') {
      return {
        testID,
        accessible: false,
      };
    }

    return {
      testID,
      accessible: true,
      accessibilityLabel: testID,
    };
  };
}

export default HelperManager;
