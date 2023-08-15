import moment from 'moment';
import HelperManager from '@skeleton-app/sdk-managers/helper';

export interface IDay {
  monthName: string;
  dayName: string;
  selected: boolean;
  isToday: boolean;
  millisecondCount: number;
  weekString: string;
}

export type TWeek = IDay[];

export type TMonth = Record<string, IDay[][]>;

export class MyDay implements IDay {
  dayName!: string;

  weekString!: string;

  monthName!: string;

  selected!: boolean;

  isToday!: boolean;

  millisecondCount!: number;

  public static todayDetail: IDay;

  public setDayName(dayName: string) {
    this.dayName = dayName;
  }

  public setWeekString(weekString: string) {
    this.weekString = weekString;
  }

  public setMonthName(monthName: string) {
    this.monthName = monthName;
  }

  public setSelected(selected: boolean) {
    this.selected = selected;
  }

  public setIsToday(isToday: boolean) {
    this.isToday = isToday;
  }

  public setMillisecondCount(millisecondCount: number) {
    this.millisecondCount = millisecondCount;
  }

  public getDay(): IDay {
    return {
      dayName: this.dayName,
      selected: this.selected,
      isToday: this.isToday,
      millisecondCount: this.millisecondCount,
      monthName: this.monthName,
      weekString: this.weekString,
    };
  }

  public createNewDay(millisecondCount: number, setTodaySelected = false) {
    const weekString = moment(millisecondCount).isoWeek();
    const dayName = moment(millisecondCount).format(
      DateManager.HYPHEN_DATE_FORMAT
    );
    const yearName = dayName.split('-')[0];
    const isToday =
      dayName === DateManager.TODAY_TEXT_V3 ||
      dayName === DateManager.TODAY_TEXT_V4;
    const myNewDay = new MyDay();
    myNewDay.setDayName(dayName);
    myNewDay.setIsToday(isToday);
    myNewDay.setMillisecondCount(millisecondCount);
    myNewDay.setSelected(false);
    myNewDay.setWeekString(weekString + ' ' + yearName);
    myNewDay.setMonthName(
      dayName
        .split('-')
        .filter((_, index) => index !== dayName.split('-').length - 1)
        .join('-')
    );
    if (isToday) {
      MyDay.todayDetail = myNewDay;
      if (setTodaySelected) {
        myNewDay.setSelected(true);
      }
    }
    return myNewDay;
  }
}

export class DateManager {
  //constants
  public static readonly ONE_SECOND = 1000;

  public static readonly ONE_MINUTE = this.ONE_SECOND * 60;

  public static readonly ONE_HOUR = this.ONE_MINUTE * 60;

  public static readonly CURRENT_WEEK_IN_YEAR = moment().format('ww');

  public static readonly TODAY_OF_YEAR = moment().dayOfYear();

  public static readonly TODAY = new Date().getTime();

  public static readonly DAY_MILLISECOND = 86400000;

  public static readonly QUARTER_OF_HOUR = this.ONE_MINUTE * 15;

  public static readonly YESTERDAY_OF_YEAR = moment(
    this.TODAY - this.DAY_MILLISECOND
  ).dayOfYear();

  public static readonly MONTH_MILLISECONDS = 2629800000;

  public static readonly DATE_FORMAT = 'dddd DD MM YYYY';

  public static readonly DATE_FORMAT_V2 = 'YYYY/MM/DD';

  public static readonly DATE_FORMAT_V3 = 'dddd';

  public static readonly DATE_FORMAT_V4 = 'YYYY/MM/D';

  public static readonly DATE_FORMAT_SLASH = 'DD/MM/YYYY';

  public static readonly HYPHEN_DATE_FORMAT = 'YYYY-MM-DD';

  public static readonly HYPHEN_DATE_FORMAT_V2 = 'DD-MM-YYYY';

  public static readonly MONTH_NAME = 'YYYY-MM';

  public static readonly FORMAT_HOURS = 'hh:mm';

  public static readonly WEEK_NUMBER = parseInt(
    moment().clone().startOf('month').add(1, 'months').format('w')
  );

  public static readonly CURRENT_WEEK_NUMBER = moment().format('WW');

  public static readonly TODAY_TEXT = moment(this.TODAY).format(
    this.DATE_FORMAT
  );

  public static readonly TODAY_TEXT_V2 = moment(this.TODAY).format(
    this.DATE_FORMAT_V2
  );

  public static readonly TODAY_TEXT_V3 = moment(this.TODAY).format(
    this.HYPHEN_DATE_FORMAT
  );

  public static readonly TODAY_TEXT_V4 = moment(this.TODAY).format(
    this.DATE_FORMAT_V4
  );

  public static readonly FORMAT_DATE_BY_DOT = 'DD.MM.YYYY';

  public static readonly THIS_MONTH_STRING = moment(this.TODAY).format(
    this.MONTH_NAME
  );

  public static readonly HOUR_LIST: string[] = (() => {
    const hourList: string[] = [];
    let startingPoint = new Date().setHours(0, 0, 0, 0);
    while (
      startingPoint <
      this.DAY_MILLISECOND + new Date().setHours(0, 0, 0, 0)
    ) {
      hourList.push(moment(startingPoint).format('HH:mm'));
      startingPoint = startingPoint + this.QUARTER_OF_HOUR;
    }
    return hourList;
  })();

  public static readonly listDayBackWard = [
    'Monday', //0
    'Tuesday', //1
    'Wednesday', //2
    'Thursday', //3
    'Friday', //4
    'Saturday', //5
    'Sunday', //6
  ];

  public static readonly listDayForward = [
    'Saturday',
    'Friday',
    'Thursday',
    'Wednesday',
    'Tuesday',
    'Monday',
    'Sunday',
  ];

  public static readonly shortDayName = this.listDayBackWard.map(
    (text: string) => text.substring(0, 3).toLocaleLowerCase()
  );

  public static checkIsLeapYear(year: number) {
    const leap = new Date(year, 1, 29).getDate() === 29;
    if (leap) {
      return true;
    } else {
      return false;
    }
  }

  public static readonly getLocalTime = (date: string, format?: string) => {
    const time = moment.utc(date).toDate();
    return moment(time, format).local().toDate();
  };

  public static readonly monthOfTheYear = parseInt(
    moment(new Date().getMonth() + 1)
      .format(moment(this.TODAY).format(this.DATE_FORMAT_V2))
      .split('/')[1]
  );

  public static readonly LAST_DAY_IN_LAST_MONTH = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    0
  ).getTime();

  public static readonly LAST_DAY_IN_MONTH = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getTime();

  public static readonly LAST_DAY_OF_THIS_MONTH_TEXT = moment(
    this.LAST_DAY_IN_MONTH
  ).format(this.DATE_FORMAT);

  public static readonly LAST_DAY_OF_LAST_MONTH_TEXT = moment(
    this.LAST_DAY_IN_LAST_MONTH
  ).format(this.DATE_FORMAT);

  private pastYearRange: number;

  private futureYearRange: number;

  private dayList: IDay[] = [];

  private weekList: TWeek[] = [];

  private monthList: TMonth[] = [];

  public getDayList(): IDay[] {
    return this.dayList;
  }

  public getWeekList() {
    return this.weekList;
  }

  public getMonthList() {
    return this.monthList;
  }

  constructor(pastYearRange: number, futureYearRange: number) {
    this.pastYearRange = pastYearRange;
    this.futureYearRange = futureYearRange;
    moment.updateLocale('en', {
      week: {
        dow: 1,
      },
    });
    this.createDayList();
  }

  private createDayList() {
    const yearDeficit =
      parseInt(moment(DateManager.TODAY).format('YY')) - this.pastYearRange;
    const isLastCentury = yearDeficit < 0;
    const firstMonthOfArr = new Date(
      `01/01/${isLastCentury ? yearDeficit + 100 : yearDeficit}`
    ).getTime();

    const totalYear = this.pastYearRange + this.futureYearRange + 1;
    const leapYear = totalYear % 4;

    for (let i = 0; i < totalYear * 365 + leapYear; i++) {
      const dayMillisecondCount =
        i * DateManager.DAY_MILLISECOND + firstMonthOfArr;
      const myDay = new MyDay().createNewDay(dayMillisecondCount);
      this.dayList.push(myDay);
    }
    this.monthList = HelperManager.groupByV2(
      this.dayList,
      'monthName'
    ) as TMonth[];
    const monthListNameArr: any = Object.keys(this.monthList);
    const output: TMonth[] = [];

    const handleFullWeek = (monthName: keyof TMonth) => {
      let myMonth: TMonth = {};
      myMonth = {
        ...HelperManager.groupByV2(
          (this.monthList as any)[monthName],
          'weekString'
        ),
      };
      const weekNumberStringArr = Object.keys(myMonth);
      for (const weekProperty of weekNumberStringArr) {
        let dayList: IDay[] = [];
        dayList = [...(myMonth as any)[weekProperty]];
        const dayListLength = dayList.length;
        const firstDayMillionSeconds = dayList[0].millisecondCount;
        const firstDay = moment(dayList[0].millisecondCount);
        if (dayListLength < 7) {
          const backWardDays = DateManager.listDayBackWard.indexOf(
            firstDay.format(DateManager.DATE_FORMAT_V3)
          );
          for (let f = 1; f < backWardDays + 1; f++) {
            const dayMillisecondCount =
              firstDayMillionSeconds - f * DateManager.DAY_MILLISECOND;
            const myBackWardDay = new MyDay().createNewDay(dayMillisecondCount);
            dayList.unshift(myBackWardDay);
          }

          const forwardDays = DateManager.listDayForward.indexOf(
            moment(dayList[dayListLength - 1].millisecondCount).format(
              DateManager.DATE_FORMAT_V3
            )
          );

          for (let f = 1; f < forwardDays + 1; f++) {
            const dayMillisecondCount =
              dayList[dayListLength - 1].millisecondCount +
              f * DateManager.DAY_MILLISECOND;
            const myForwardDay = new MyDay().createNewDay(dayMillisecondCount);
            dayList.push(myForwardDay);
          }
        }
        dayList = [...HelperManager.removeDuplicates(dayList, 'dayName')];
        if (dayList.length === 6) {
          dayList.push(
            new MyDay().createNewDay(
              dayList[dayList.length - 1].millisecondCount +
                DateManager.DAY_MILLISECOND
            )
          );
        }

        const newSortDayList = dayList.sort(
          (a, b) => a.millisecondCount - b.millisecondCount
        ) as any;

        myMonth = {
          ...myMonth,
          [weekProperty]: newSortDayList,
        };
      }
      return myMonth;
    };
    handleFullWeek(monthListNameArr[0]);
    for (const monthName of monthListNameArr) {
      const myMonth: any = {
        [monthName]: handleFullWeek(monthName),
      };
      output.push(myMonth);
    }
    this.monthList = output;
  }
}
