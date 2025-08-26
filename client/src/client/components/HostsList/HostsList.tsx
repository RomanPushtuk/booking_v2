import { Flex, List, Stack, ThemeIcon, Text, Badge, SimpleGrid, Box } from "@mantine/core";
import { HostDTO } from "../../../queries/bookingSchemas"
import { IconChevronRight, IconUser } from "@tabler/icons-react";

import styles from './HostsList.module.css';
import { generateTimeSlots } from "../../utils";

interface HostsListProps {
	isLoading: boolean;
	list?: HostDTO[];
}

export const HostsList = (props: HostsListProps) => {
	const { list = [], isLoading = true } = props;

	const handleBookToday = () => {
		
	}

	const handleBookTomorrow = () => {

	}

	return (
		<List size="lg" spacing={16}>
			{list.map(item => {
				const timeSlots = generateTimeSlots(item.workHours);

				return (
					<List.Item
						key={item.id}
						icon={
							<ThemeIcon color="blue" size={48} radius="xl">
								<IconUser size={24} />
							</ThemeIcon>
						}
						classNames={{
							itemWrapper: styles.itemWrapper,
							itemLabel: styles.itemLabel
						}}
					>
						<Stack gap={8}>
							<Text fw={'bold'}>{item.id}</Text>
							<Box>
								<Text size="xs">Working days: {item.workDays.join(' ')}</Text>
								<Text size="xs">Office hours: {item.workHours.map((item, index) => {
									return item.from + "-" + item.to + " "
								})}</Text>
							</Box>
							<Box>
								<Text fw={'bold'}>Today:</Text>
								<SimpleGrid cols={6} verticalSpacing='4px'>
									{timeSlots.map(item => {
										return (
											<Badge
												size="lg"
												onClick={() => { }}
												style={{ cursor: 'pointer' }}
											>
												{item.split('-')[0]}
											</Badge>
										)
									})}
								</SimpleGrid>
							</Box>
							<Box>
								<Text fw={'bold'}>Tomorrow:</Text>
								<SimpleGrid cols={6} verticalSpacing='4px'>
									{timeSlots.map(item => {
										return (
											<Badge
												size="lg"
												onClick={() => { }}
												style={{ cursor: 'pointer' }}
											>
												{item.split('-')[0]}
											</Badge>
										)
									})}
								</SimpleGrid>
							</Box>
						</Stack>
					</List.Item>
				)
			})}
		</List>
	)
}
