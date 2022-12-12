import { getFormattedDateToLocale, getFormattedMonthToLocale } from "../utils";
import { isFirstDateEarlierThanSecondOne } from "../utils/handlers/dateHandlers";
import classNames from "classnames";

type YearViewProps = {
  months: Array<Date>;
  onMonthClick: (date: Date) => void;
  defaultLocale: string;
  minDate: Date | string;
  selectedDates: Array<string | Date>;
};

const YearView = ({
  months,
  onMonthClick,
  defaultLocale,
  minDate,
  selectedDates,
}: YearViewProps) => {
  return (
    <div className={"datePicker-body"}>
      {months.map((item) => {
        const isDisabled =
          minDate !== undefined
            ? isFirstDateEarlierThanSecondOne(item, minDate)
            : false;
        const isSelected = selectedDates.includes(
          getFormattedDateToLocale(item)
        );
        return (
          <button
            onClick={() => {
              return onMonthClick(item);
            }}
            disabled={isDisabled}
            className={classNames("datePicker-body__month-cell", {
              selected: isSelected && !isDisabled,
              "datePicker-body__day_disabled": isDisabled,
            })}
            key={item.toString()}
          >
            {getFormattedMonthToLocale({
              month: item,
              locale: defaultLocale,
              format: "long",
            })}
          </button>
        );
      })}
    </div>
  );
};

export default YearView;