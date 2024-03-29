import { formatDate, getDatesInRange, getMonday, getSunday } from "../handlers";
import type { DatePickerChangeHandler, DatePickerMode, DatePickerValue } from "../types/DatePicker.typedef";
import { useState } from "react";
import { defineDefaultSelectedDates } from "../handlers/defineDefaultSelectedDates";

type UseDatePickerModes = {
	value: DatePickerValue;
	onChangeDate: DatePickerChangeHandler;
	mode: DatePickerMode;
};
// hook that implements logic for different datePicker modes
const useDatePickerModes = ({ value, onChangeDate, mode }: UseDatePickerModes) => {
	const defaultSelectedDates = defineDefaultSelectedDates(mode, value);
	const [selectedDates, setSelectedDates] = useState<Array<Date | string>>(defaultSelectedDates);

	const selectDayForInterval = (date: Date) => {
		const isNotInterval = value instanceof Date || Array.isArray(value);
		if (isNotInterval) {
			return;
		}
		const isDateIncluded = selectedDates.includes(formatDate(date));

		if (isDateIncluded) {
			onChangeDate({ value: { start: null, end: null } });
			setSelectedDates([]);
		}

		if (value.start !== null && value.end !== null && date > value.end) {
			onChangeDate({ value: { start: value.start, end: date } });
			const formattedDates = getDatesInRange(value.start, date).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
		}

		if (value.start !== null && value.end !== null && date < value.start) {
			onChangeDate({ value: { start: date, end: value.end } });
			const formattedDates = getDatesInRange(date, value.end).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
		}

		if (value.start === null) {
			onChangeDate({ value: { start: date, end: value.end } });
			setSelectedDates([formatDate(date)]);
		}

		if (value.start !== null && value.end === null) {
			const start = new Date(value.start) < date ? value.start : date;
			const end = new Date(date) > value.start ? date : value.start;
			const formattedDates = getDatesInRange(start, end).map((item) => {
				return formatDate(item);
			});
			setSelectedDates(formattedDates);
			onChangeDate({ value: { start: start, end: end } });
		}
	};

	const selectDayForWeek = (date: Date) => {
		const firstDate = getMonday(date);
		const lastDate = getSunday(date);
		const formattedDates = getDatesInRange(firstDate, lastDate).map((item) => {
			return formatDate(item);
		});
		setSelectedDates(formattedDates);
		onChangeDate({ value: { start: firstDate, end: lastDate } });
	};

	const selectSingleDate = (date: Date, formattedDate: string) => {
		setSelectedDates([formattedDate]);
		onChangeDate({ value: date });
	};

	const mappedSelectedDatesToFormattedValue = selectedDates.map((item) => {
		return formatDate(new Date(item));
	});

	const selectDayForPartial = (date: Date) => {
		if (mappedSelectedDatesToFormattedValue.includes(formatDate(date))) {
			const filteredDates = selectedDates.filter((item) => {
				return formatDate(new Date(date)) !== formatDate(new Date(item));
			});
			setSelectedDates(filteredDates);
			if (selectedDates.length > 0) {
				onChangeDate({
					value: selectedDates
						.filter((item) => {
							return formatDate(new Date(item)) !== formatDate(date);
						})
						.map((date) => {
							return new Date(date);
						}),
				});
			}

			return;
		}
		setSelectedDates((prev) => {
			return [...prev, formatDate(date)];
		});
		const mappedSelectedDatesToRawDates = selectedDates.map((item) => {
			return new Date(item);
		});
		onChangeDate({ value: [...mappedSelectedDatesToRawDates, new Date(date)] });
	};

	const selectDay = (date: Date) => {
		const formattedDate = formatDate(date);
		switch (mode) {
			case "single": {
				selectSingleDate(date, formattedDate);
				break;
			}
			case "interval": {
				selectDayForInterval(date);
				break;
			}
			case "partial": {
				selectDayForPartial(date);
				break;
			}
			case "week": {
				selectDayForWeek(date);
				break;
			}
		}
	};

	return {
		selectedDates,
		selectDay,
	};
};

export default useDatePickerModes;
