import React from "react";

import { LayoutAnimation, TextStyle, ViewStyle } from "react-native";
import moment from "moment";
import { DateManager, IDay } from "@src/helper/DateManager";
import { COLORS } from "@src/assets";
import styles from "./Styles.CalendarComponent";
import { EBackOrForward, ICalendarComponentProps } from "./Model.CalendarComponent";
import LanguagesManager from "@src/languages/LanguagesManager";
import LanguageOptions from "@src/languages/LanguageOptions";

const ViewModel = (props: ICalendarComponentProps) => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedDate,
    disableRange = true,
    notShowOutOfMonth = true,
    setSelectedDate,
    currentMonthDetail,
  } = props;

  const handleForwardMonth = React.useCallback(
    (type: EBackOrForward) => () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setSelectedMonth((prev: string) => {
        let newMonthName = "";

        if (type === EBackOrForward.backward) {
          newMonthName = moment(new Date(prev + "-01").getTime())
            .subtract(1, "months")
            .format(DateManager.MONTH_NAME);
        } else {
          newMonthName = moment(new Date(prev + "-01").getTime())
            .add(1, "months")
            .format(DateManager.MONTH_NAME);
        }
        const fifteenYearsAgo = moment().subtract(15, "years").format("YYYY-MM");

        // If the new month is less than 15 years from now, return the previous month
        if (moment(new Date(fifteenYearsAgo).getTime()).isBefore(new Date(newMonthName).getTime())) {
          return prev;
        }

        return newMonthName;
      });
    },
    [setSelectedMonth],
  );

  const canNextMonth = React.useMemo(() => {
    const newMonthName = moment(new Date(selectedMonth + "-01").getTime())
      .add(1, "months")
      .format(DateManager.MONTH_NAME);

    const fifteenYearsAgo = moment().subtract(15, "years").format("YYYY-MM");

    // If the new month is less than 15 years from now, return the previous month
    return moment(new Date(fifteenYearsAgo).getTime()).isBefore(new Date(newMonthName).getTime());
  }, [selectedMonth]);

  const _handleSelectedDate = React.useCallback(
    (date: IDay) => () => {
      const newDate = Object.assign({
        ...date,
        selected: true,
      });
      setSelectedDate(newDate);
    },
    [setSelectedDate],
  );

  const _isSelectedOrInRange = React.useCallback(
    (date: IDay) => {
      const isDisable = false;
      const dateStyle: ViewStyle = {
        ...styles.dateItemWrapper,
      };
      const leftMaskViewDateStyle: ViewStyle = {
        ...styles.maskViewDate,
        left: 0,
      };
      const rightMaskViewDateStyle: ViewStyle = {
        ...styles.maskViewDate,
        right: 0,
      };
      const textStyle: TextStyle = {
        ...styles.dayNameText,
      };
      const dateWrapperStyle: ViewStyle = {
        ...styles.dateWrapper,
      };
      if (date.monthName !== selectedMonth) {
        textStyle.color = "#B9BCC0";
      }
      const isTail =
        moment(selectedDate.millisecondCount).format(DateManager.DATE_FORMAT_SLASH) ===
        moment(date.millisecondCount).format(DateManager.DATE_FORMAT_SLASH);
      const isHead =
        moment(selectedDate.millisecondCount).format(DateManager.DATE_FORMAT_SLASH) ===
        moment(date.millisecondCount).format(DateManager.DATE_FORMAT_SLASH);

      const inRange =
        selectedDate.millisecondCount <= date.millisecondCount &&
        date.millisecondCount <= selectedDate.millisecondCount &&
        !disableRange;

      if (inRange && !disableRange) {
        dateStyle.backgroundColor = COLORS.mainSubtleColor;
        dateWrapperStyle.backgroundColor = COLORS.mainSubtleColor;
        textStyle.color = COLORS.defaultTextColor;
      }

      const isOutOfCurrentMonthRange = date.monthName !== selectedMonth;

      if (isOutOfCurrentMonthRange && !!notShowOutOfMonth) {
        dateWrapperStyle.backgroundColor = COLORS.white;
        textStyle.color = COLORS.white;
        dateWrapperStyle.opacity = 0;
      }

      if (isTail || isHead) {
        dateStyle.backgroundColor = COLORS.mainColor;
        textStyle.color = COLORS.white;
      }

      if (isHead && !disableRange) {
        leftMaskViewDateStyle.backgroundColor = COLORS.lightFourColor;
        leftMaskViewDateStyle.backgroundColor = COLORS.white;
      }

      if (isTail && !disableRange) {
        leftMaskViewDateStyle.backgroundColor = COLORS.lightFourColor;
        rightMaskViewDateStyle.backgroundColor = COLORS.white;
      }

      return {
        isTail,
        isHead,
        dateStyle,
        isDisable,
        textStyle,
        dateWrapperStyle,
        leftMaskViewDateStyle,
        rightMaskViewDateStyle,
        isOutOfCurrentMonthRange,
      };
    },
    [selectedMonth, selectedDate, disableRange, notShowOutOfMonth],
  );

  const dateNameOfTheWeekArr = React.useMemo(() => {
    return [
      LanguagesManager.translate(LanguageOptions.monday),
      LanguagesManager.translate(LanguageOptions.tuesday),
      LanguagesManager.translate(LanguageOptions.wednesday),
      LanguagesManager.translate(LanguageOptions.thursday),
      LanguagesManager.translate(LanguageOptions.friday),
      LanguagesManager.translate(LanguageOptions.saturday),
      LanguagesManager.translate(LanguageOptions.sunday),
    ];
  }, []);

  const monthHeaderText = React.useMemo(() => {
    let output = "";
    const text = moment(selectedMonth + "-01").format("MMMM yyyy");
    output = LanguagesManager.translate(text.split(" ")[0] as any) + moment(selectedMonth + "-01").format(" yyyy");

    return output;
  }, [selectedMonth]);

  return {
    canNextMonth,
    monthHeaderText,
    currentMonthDetail,
    handleForwardMonth,
    _handleSelectedDate,
    _isSelectedOrInRange,
    dateNameOfTheWeekArr,
  };
};

export default ViewModel;
