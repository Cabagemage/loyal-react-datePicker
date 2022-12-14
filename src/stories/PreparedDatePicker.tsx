import type { DatePickerProps, CalendarViews } from "../core/types";
import { useState } from "react";
import { DatePicker } from "../index";
import { DatePickerChangeHandler } from "../core/types";

type PreparedDatePickerProps = {
	width?: number;
	onPartialChange?: (dates: Array<Date>) => void;
	onSingleDateChange?: (date: Date) => void;
	onWeekChange?: (value: { start: Date | null; end: Date | null }) => void;
	onIntervalDatesChange?: (value: { start: Date | null; end: Date | null }) => void;
} & Omit<DatePickerProps, "changeCalendarView" | "onDateChange">;
export const PreparedDatePicker = ({
	width = 360,
	onPartialChange,
	onWeekChange,
	onIntervalDatesChange,
	onSingleDateChange,
	...props
}: PreparedDatePickerProps) => {
	const [view, setView] = useState<CalendarViews>(props.view);

	const changeCurrentCalendarView = () => {
		switch (view) {
			case "month":
				return setView("year");
			case "year":
				return setView("decade");
			case "decade":
				return setView("month");
			default:
				return setView("month");
		}
	};

	const monthClickHandler = (date: Date) => {
		setView("month");

		// by default click on month do nothing. You should configure it manually to make it work.
		props.onMonthClick && props.onMonthClick(date);
	};

	const onYearClick = (date: Date) => {
		setView("year");
		// by default click on year do nothing. You should configure it manually to make it work.
		props.onYearClick && props.onYearClick(date);
	};

	const onDateChange: DatePickerChangeHandler = (value) => {
		if (value.value instanceof Date) {
			if (onSingleDateChange !== undefined) {
				onSingleDateChange(value.value);
			}
			return;
		}
		if (Array.isArray(value.value)) {
			if (onPartialChange !== undefined) {
				onPartialChange(value.value);
			}
			return;
		}
		if (onIntervalDatesChange !== undefined) {
			onIntervalDatesChange(value.value);
			return;
		}
		if (onWeekChange !== undefined) {
			onWeekChange && onWeekChange(value.value);
		}
	};
	return (
		<div style={{ width: width, flexShrink: 0 }}>
			<DatePicker
				{...props}
				onDateChange={onDateChange}
				onYearClick={onYearClick}
				changeCalendarView={changeCurrentCalendarView}
				onMonthClick={monthClickHandler}
				view={view}
			/>
		</div>
	);
};
