import type { Meta, StoryObj } from "@storybook/react-vite";

import { TodayAgenda } from "./TodayAgenda";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Widgets/TodayAgenda",
  component: TodayAgenda,
  args: {
    time: {
      dayOfWeek: 24,
      dayName: "Monday",
      monthName: "May",
      year: 2024,
    },
    bookings: [
      {
        timeSlot: "09:45 - 10:30",
        info: "ClientA",
      },
      {
        timeSlot: "12:00 - 12:45",
        info: "ClientB",
      },
      {
        timeSlot: "13:30 - 14:15",
        info: "ClientC",
      },
    ],
  },
} satisfies Meta<typeof TodayAgenda>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
