import type { DAYS_ORDINAL_NUMBERS_LIST } from "../constants";
export type CalendarViews = "decade" | "month" | "year";
export type DatePickerMode = "interval" | "partial" | "single" | "week";
export type DatePickerInterval = { start: Date | null; end: Date | null };
export type DatePickerValue = Array<Date> | Date | DatePickerInterval;
export type DatePickerChangeHandler = ({ value }: { value: DatePickerValue }) => void;

export type CustomizedDate = {
	className: HTMLButtonElement["className"];
	date: Date;
	isDisabled?: boolean;
	textOnHover?: string;
};

export type WeekendDays = { weekendDays: typeof DAYS_ORDINAL_NUMBERS_LIST; shouldBeDisabled?: boolean };

export type DatePickerMonthViewClassNames = {
	monthViewMonthBody: HTMLDivElement["className"];
	monthViewWeekDays: HTMLUListElement["className"];
	monthViewDay: HTMLButtonElement["className"];
	monthViewDayActive: HTMLButtonElement["className"];
	monthWeekendDay: HTMLButtonElement["className"];
	monthViewDayDefaultBackgroundClassName: HTMLButtonElement["className"];
	monthViewDayDayText: HTMLSpanElement["className"];
	monthViewDisabledDate: HTMLButtonElement["className"];
	monthViewWeekDaysListItem: HTMLLIElement["className"];
	monthViewDateIsNotRelatedToMonth: HTMLButtonElement["className"];
	monthViewToday: HTMLButtonElement["className"];
};

export type DatePickerYearViewClassNames = {
	yearViewBody: HTMLDivElement["className"];
	yearViewMonthCell: HTMLButtonElement["className"];
	yearViewMonthCellSelected: HTMLButtonElement["className"];
	yearViewCellDisabled: HTMLButtonElement["className"];
};

export type DatePickerDecadeViewClassNames = {
	body: HTMLDivElement["className"];
	decadeViewYearCell: HTMLButtonElement["className"];
	decadeViewCellDisabled: HTMLButtonElement["className"];
	decadeViewCellSelected: HTMLButtonElement["className"];
};

export type DatePickerCommonClassNames = {
	wrapper: HTMLDivElement["className"];
	header: HTMLDivElement["className"];
	headerControls: HTMLDivElement["className"];
	headerText: HTMLTimeElement["className"];
	arrowLeft: HTMLButtonElement["className"];
	arrowRight: HTMLButtonElement["className"];
};

export type DatePickerClassNames = Partial<{
	month: Partial<DatePickerMonthViewClassNames>;
	common: Partial<DatePickerCommonClassNames>;
	year: Partial<DatePickerYearViewClassNames>;
	decade: Partial<DatePickerDecadeViewClassNames>;
}>;

export type AvailableDateOptions = {
	isPassedDateIncluded?: boolean;
};

export type AvailableDate = { date: Date; options?: AvailableDateOptions };

export type DatePickerControlsProps = {
	changeCalendarView: () => void;
	toPrevUnitNavAction: () => void;
	headerText: string;
	toNextUnitNavAction: () => void;
};

export type BaseCellRenderProps = { date: Date; onDateClick: (date: Date) => void };

export type DatePickerProps = {
	locale?: Intl.LocalesArgument;
	value: DatePickerValue;
	minDate?: AvailableDate;
	maxDate?: AvailableDate;
	disabledDates?: Array<Date>;
	customHeaderRenderProp?: (props: DatePickerControlsProps) => JSX.Element;
	customMonthViewRenderProp?: (props: MonthViewProps) => JSX.Element;
	customYearViewRenderProp?: (props: YearViewProps) => JSX.Element;
	customDecadeViewRenderProp?: (props: DecadeViewProps) => JSX.Element;
	customYearCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	customMonthCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	customDayCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	weekendDays?: WeekendDays;
	customizationClassNames?: Partial<DatePickerClassNames>;
	changeCalendarView: () => void;
	customizedDates?: Array<CustomizedDate>;
	onMonthClick?: (value: Date) => void;
	onYearClick?: (value: Date) => void;
	onDateChange: DatePickerChangeHandler;
	mode?: DatePickerMode;
	view: CalendarViews;
	footerElement?: JSX.Element;
	isVisible?: boolean;
};

export type YearViewProps = {
	months: Array<Date>;
	onMonthClick: (date: Date) => void;
	defaultLocale: Intl.LocalesArgument;
	currentMonthIdx: number;
	customMonthCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	minDate?: AvailableDate;
	maxDate?: AvailableDate;
	customYearClassNames?: Partial<DatePickerYearViewClassNames>;
};

export type DecadeViewProps = {
	years: Array<Date>;
	onYearClick: (date: Date) => void;
	customYearCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	minDate?: AvailableDate;
	maxDate?: AvailableDate;
	activeYear?: number;
	customDecadeClassNames?: Partial<DatePickerDecadeViewClassNames>;
};

export type MonthViewProps = {
	locale: Intl.LocalesArgument;
	month: Array<Date>;
	maxDate?: AvailableDate;
	customMonthClassNames?: Partial<DatePickerMonthViewClassNames>;
	customizedDates?: Array<CustomizedDate>;
	customDayCellRenderProp?: (props: BaseCellRenderProps) => JSX.Element;
	currentMonth: number;
	selectedDates: Array<Date | string>;
	onDateChange: (date: Date) => void;
	minDate?: AvailableDate;
	disabledDates?: Array<Date | string>;
	weekendDays?: WeekendDays;
};
