import { List, ThemeIcon } from "@mantine/core";
import { IconUser, IconCalendarTime, IconList, IconChevronRight } from "@tabler/icons-react";

import styles from './Dashboard.module.css';

interface DashboardProps {
	onSelectHostClick: () => void
	onSelectDateTimeClick: () => void
	onSelectServiceClick: () => void
}

export const Dashboard = (props: DashboardProps) => {
	const { onSelectHostClick, onSelectDateTimeClick, onSelectServiceClick } = props;

	return (
		<List size="lg" spacing={16}>
			<List.Item
				icon={
					<ThemeIcon color="blue" size={48} radius="xl">
						<IconUser size={24} />
					</ThemeIcon>
				}
				classNames={{
					itemWrapper: styles.itemWrapper,
					itemLabel: styles.itemLabel
				}}
				onClick={onSelectHostClick}
			>
				Select Host
				<IconChevronRight style={{ cursor: 'pointer' }} />
			</List.Item>
			<List.Item
				icon={
					<ThemeIcon color="blue" size={48} radius="xl">
						<IconCalendarTime size={24} />
					</ThemeIcon>
				}
				classNames={{
					itemWrapper: styles.itemWrapper,
					itemLabel: styles.itemLabel
				}}
				onClick={onSelectDateTimeClick}
			>
				Select Date & Time
				<IconChevronRight style={{ cursor: 'pointer' }} />
			</List.Item>
			<List.Item
				icon={
					<ThemeIcon color="blue" size={48} radius="xl">
						<IconList size={24} />
					</ThemeIcon>
				}
				classNames={{
					itemWrapper: styles.itemWrapper,
					itemLabel: styles.itemLabel
				}}
				onClick={onSelectServiceClick}
			>
				Select services
				<IconChevronRight style={{ cursor: 'pointer' }} />
			</List.Item>
		</List>
	)
}
