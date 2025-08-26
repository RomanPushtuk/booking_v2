import { DateTime, Duration } from 'luxon';


type WorkHours = { from: string, to: string }

export const generateTimeSlots = (workHours: WorkHours[], slotDurationMinutes = 60) => {
	const slots: string[] = [];

	workHours.forEach(({ from, to }) => {
		let start = DateTime.fromFormat(from, "HH:mm");
		const end = DateTime.fromFormat(to, "HH:mm");
		const slotDuration = Duration.fromObject({ minutes: slotDurationMinutes });

		while (start.plus(slotDuration) <= end) {
			const slotStart = start.toFormat("HH:mm");
			const slotEnd = start.plus(slotDuration).toFormat("HH:mm");
			slots.push(`${slotStart}-${slotEnd}`);
			start = start.plus(slotDuration);
		}
	});

	return slots;
}
