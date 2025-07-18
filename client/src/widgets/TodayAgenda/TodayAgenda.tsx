import { Card, Flex, Grid, Stack, Text, useMantineTheme } from "@mantine/core";

interface ITodayAgendaProps {
  time: {
    dayOfWeek: number;
    dayName: string;
    monthName: string;
    year: number;
  };
  bookings: {
    timeSlot: string;
    info: string;
  }[];
}

const TodayAgenda = (props: ITodayAgendaProps) => {
  const { time, bookings } = props;
  const theme = useMantineTheme();

  return (
    <Card withBorder shadow={theme.shadows.sm}>
      <Grid>
        <Grid.Col span={4}>
          <Flex>
            <Text size="48px" mr={theme.spacing.md}>
              {time.dayOfWeek}
            </Text>
            <Stack gap={2}>
              <Text>{time.dayName}</Text>
              <Text>{time.monthName + " " + time.year}</Text>
            </Stack>
          </Flex>
        </Grid.Col>
        <Grid.Col span={8}>
          {bookings.map((booking) => {
            return (
              <Grid>
                <Grid.Col span={6}>{booking.timeSlot}</Grid.Col>
                <Grid.Col span={6}>{booking.info}</Grid.Col>
              </Grid>
            );
          })}
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export { TodayAgenda };
