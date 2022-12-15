export type GetCurrentMonth = ({
  year,
  month,
}: {
  year?: number;
  month?: number;
}) => Array<Date>;

export type DateType = "string" | Date | null;

export type GetDatesInRange = (start: DateType, end: DateType) => Array<Date>;

export type GetDatesOptions = {
  initialDate?: Date;
  month?: number;
  year?: number;
};

type GetFormattedMonthParams = {
  month: Date;
  locale: Intl.LocalesArgument;
  format?: "short" | "long";
};

export type GetFormattedMonthToLocale = (
  params: GetFormattedMonthParams
) => string;

export type GetMonthCalendarViewDates = (
  params: GetDatesOptions
) => Array<Date>;
export type GetMonthsOfYear = (date: Date) => Array<Date>;

export type GetFormattedShortDay = (date: Date) => string;
export type DateUnit = "month" | "year" | "day" | "week";