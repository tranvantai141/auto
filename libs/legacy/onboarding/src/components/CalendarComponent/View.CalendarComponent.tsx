import { Animated, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScaleManager from "@src/assets/ScaleManager";
import { IDay, TWeek } from "@src/helper/DateManager";
import { THEMES } from "@src/assets";
import styles from "./Styles.CalendarComponent";
import { EBackOrForward, ICalendarComponentProps, ICustomizedCalendar } from "./Model.CalendarComponent";
import ViewModel from "./ViewModel.CalendarComponent";
import HelperManager from "@sdk-managers/helper";

export const DEFAULT_SELECTED_DATES: ICustomizedCalendar = {
  singleDate: {} as IDay,
  startDate: {} as IDay,
  endDate: {} as IDay,
};



const CalendarComponent: React.FC<ICalendarComponentProps> = React.memo((props) => {
  const {
    canNextMonth,
    monthHeaderText,
    currentMonthDetail,
    handleForwardMonth,
    _handleSelectedDate,
    _isSelectedOrInRange,
    dateNameOfTheWeekArr,
  } = ViewModel(props);

  const _renderDateNameOfTheWeek = React.useCallback(() => {
    const output: JSX.Element[] = [];

    for (const dateName of dateNameOfTheWeekArr) {
      output.push(
        <View {...HelperManager.setLocator(styles.TEST_ID, `dateName`)} key={dateName} style={styles.dateWrapper}>
          <View style={styles.dateItemWrapper}>
            <Text style={styles.dayNameTextHeader}>{dateName.substring(0, 3)}</Text>
          </View>
        </View>,
      );
    }

    return output;
  }, [dateNameOfTheWeekArr]);

  const _renderWeekContainer = React.useCallback(
    (weekList: TWeek[]) => {
      const output: JSX.Element[] = [];
      const weekListValue = Object.values(weekList);
      for (let i = 0; i < weekListValue.length; i++) {
        const week = weekListValue[i];
        const dayList: JSX.Element[] = [];
        for (const date of week) {
          const dateStrArr = date.dayName.split("-");
          const dateNumber = dateStrArr[dateStrArr.length - 1];
          const {
            isTail,
            isHead,
            dateStyle,
            textStyle,
            isDisable,
            dateWrapperStyle,
            leftMaskViewDateStyle,
            rightMaskViewDateStyle,
          } = _isSelectedOrInRange(date);
          dayList.push(
            <View key={date.dayName} style={dateWrapperStyle}>
              <TouchableOpacity disabled={isDisable} onPress={_handleSelectedDate(date)} style={dateStyle}>
                <Text style={textStyle}>{dateNumber}</Text>
              </TouchableOpacity>
              {isHead && <View style={leftMaskViewDateStyle} />}
              {isTail && <View style={rightMaskViewDateStyle} />}
            </View>,
          );
        }
        output.push(
          <View key={`week-${i}`} style={[styles.weekContainer, { marginTop: ScaleManager.scaleSizeHeight(5) }]}>
            {dayList}
          </View>,
        );
      }

      return output;
    },
    [_handleSelectedDate, _isSelectedOrInRange],
  );

  const _renderMonthContainer = React.useCallback(() => {
    const output: JSX.Element[][] = [];
    for (const week of Object.values(currentMonthDetail)) {
      output.push(_renderWeekContainer(week));
    }
    return (
      <View {...HelperManager.setLocator(styles.TEST_ID, `monthContainer`)} style={styles.monthContainer}>
        {output}
      </View>
    );
  }, [currentMonthDetail, _renderWeekContainer]);

  const _renderHeaderComponent = React.useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.monthHeaderTextWrapper}>
          <Text style={styles.monthHeaderText}>{monthHeaderText}</Text>
        </View>
        <View style={styles.arrowWrapperRow}>
          <TouchableOpacity
            {...HelperManager.setLocator(styles.TEST_ID, `arrowLeftButton`)}
            style={styles.arrowLeftButton}
            onPress={handleForwardMonth(EBackOrForward.backward)}
          >
            <Text style={THEMES.commonBoldText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity
            {...HelperManager.setLocator(styles.TEST_ID, `arrowRightButton`)}
            style={styles.arrowRightButtonStyle(!canNextMonth)}
            onPress={handleForwardMonth(EBackOrForward.forward)}
          >
            <Text style={THEMES.commonBoldText}>→</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [handleForwardMonth, monthHeaderText, canNextMonth]);

  return (
    <Animated.View {...HelperManager.setLocator(styles.TEST_ID, `container`)} style={styles.container}>
      {_renderHeaderComponent()}
      <View {...HelperManager.setLocator(styles.TEST_ID, `weekContainer`)} style={styles.weekContainer}>
        {_renderDateNameOfTheWeek()}
      </View>
      {_renderMonthContainer()}
    </Animated.View>
  );
});

export default React.memo(CalendarComponent);
