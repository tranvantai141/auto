import { MyDay, DateManager } from './sdk-managers-date';
import * as moment from 'moment';

describe('MyDay', () => {
  it('should create a new day with the provided millisecond count', () => {
    const myDayInstance = new MyDay();
    const newDay = myDayInstance.createNewDay(Date.now());

    expect(newDay).toBeDefined();
    expect(newDay.dayName).toBe(
      moment(Date.now()).format(DateManager.HYPHEN_DATE_FORMAT)
    );
  });

  it('should set and get day properties correctly', () => {
    const myDayInstance = new MyDay();

    myDayInstance.setDayName('Monday');
    myDayInstance.setSelected(true);

    const day = myDayInstance.getDay();
    expect(day.dayName).toBe('Monday');
    expect(day.selected).toBe(true);
  });

  // ... Add more tests as needed for MyDay
});

describe('DateManager', () => {
  it('should check if a year is a leap year correctly', () => {
    expect(DateManager.checkIsLeapYear(2020)).toBe(true); // 2020 is a leap year
    expect(DateManager.checkIsLeapYear(2021)).toBe(false); // 2021 is not a leap year
  });

  // ... Add more tests as needed for DateManager
});
