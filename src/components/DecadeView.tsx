import classNames from "classnames";
import { initDecadeCalendarClassNames } from "../core/utils/initDecadeCalendarClassNames";
import type { DecadeViewProps } from "../core/types/DatePicker.typedef";
import { isFirstDateEarlierThanSecondOne, subtract } from "../core/handlers";
import { ONE_YEAR } from "../core/constants";

const DecadeView = ({
	years,
	onYearClick,
	minDate,
	maxDate,
	activeYear,
	customDecadeClassNames,
	customYearCellRenderProp,
}: DecadeViewProps) => {
	const {
		decadeCellSelected,
		decadeViewCellClassName,
		decadeViewBodyClassName,
		decadeCellDisabledClassName,
	} = initDecadeCalendarClassNames(customDecadeClassNames);

	return (
		<div className={decadeViewBodyClassName}>
			{years.map((item) => {
				const lastDateInMonth = new Date(item.getFullYear(), item.getMonth() + 1, 0);
				// we don't want to disable year for chose year have not passed
				const isLastDateInMonthEqualToPassedMinDate =
					minDate?.date.toDateString() === lastDateInMonth.toDateString();
				const minDateYear = isLastDateInMonthEqualToPassedMinDate
					? minDate.date
					: subtract({ date: new Date(minDate?.date ?? new Date()), type: "year", count: ONE_YEAR });
				const isDisabledByMaxDate =
					maxDate !== undefined ? isFirstDateEarlierThanSecondOne(maxDate.date, item) : false;
				const isDisabledByMinDate =
					minDate !== undefined ? isFirstDateEarlierThanSecondOne(item, minDateYear) : false;

				if (customYearCellRenderProp !== undefined) {
					customYearCellRenderProp({ date: item, onDateClick: onYearClick });
				}
				const isSelected = activeYear === item.getFullYear();
				return (
					<button
						type="button"
						onClick={() => {
							return onYearClick(item);
						}}
						disabled={isDisabledByMinDate || isDisabledByMaxDate}
						className={classNames(decadeViewCellClassName, {
							[decadeCellDisabledClassName]: isDisabledByMinDate || isDisabledByMaxDate,
							[decadeCellSelected]: isSelected,
						})}
						key={item.toString()}
					>
						{item.getFullYear()}
					</button>
				);
			})}
		</div>
	);
};

export default DecadeView;
