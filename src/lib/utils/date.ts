import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const JST = 'Asia/Tokyo';

export function getJSTDateString(): string {
	return dayjs().tz(JST).format('YYYY-MM-DD');
}

export function getJSTNow(): dayjs.Dayjs {
	return dayjs().tz(JST);
}
