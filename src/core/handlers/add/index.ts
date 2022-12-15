import { DateUnit } from "../../types/commonTypes";

type Add = ({ date, count, type }: { date: Date | string; count: number; type: DateUnit }) => Date;

export const add: Add = ({ date, count, type }) => {
	const resultDate = new Date(date);

	switch (type) {
		case "day": {
			const msDayCount = 1000 * count;
			const valueInMS = 24 * 60 * 60 * msDayCount;
			resultDate.setTime(resultDate.getTime() + valueInMS);
			return resultDate;
		}
		case "month": {
			return new Date(resultDate.setMonth(resultDate.getMonth() + count));
		}
		case "year": {
			return new Date(resultDate.setFullYear(resultDate.getFullYear() + count));
		}
		case "week": {
			return new Date(resultDate.setDate(resultDate.getDate() + 7 * count));
		}
		default:
			return new Date();
	}
};
