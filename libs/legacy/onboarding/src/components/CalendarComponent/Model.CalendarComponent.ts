import { IDay, MyDay, TMonth } from '@skeleton-app/sdk-managers/date';

export interface ICalendarComponentProps {
  currentMonthDetail: TMonth;
  selectedDate: MyDay;
  selectedMonth: string;
  disableRange: boolean;
  freePastSelect?: boolean;
  notShowOutOfMonth: boolean;
  setSelectedDate: React.Dispatch<React.SetStateAction<MyDay>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<string>>;
}

export enum EBackOrForward {
  backward,
  forward,
}

export interface ICustomizedCalendar {
  singleDate: IDay;
  startDate: IDay;
  endDate: IDay;
}
