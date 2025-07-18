import type { Meta, StoryObj } from "@storybook/react-vite";

import { Flow } from "./Flow";
import { SelectTimeSlotProvider } from "../../contexts/SelectTimeSlotContext";

const meta = {
  title: "Widgets/Flow",
  component: Flow,
  args: {
    list: [
      {
        name: "Roman Pushtuk",
        description: "Specialist in civil law",
        list: [
          {
            slotId: "8fjuz82",
            value: "10:00",
          },
          {
            slotId: "0fj2nu3",
            value: "11:00",
          },
          {
            slotId: "82jdun3",
            value: "12:00",
          },
        ],
      },
      {
        name: "Antowa Muliarchyk",
        description: "Specialist in backend development",
        list: [
          {
            slotId: "ujn82fn",
            value: "14:00",
          },
          {
            slotId: "0fn828n",
            value: "15:00",
          },
          {
            slotId: "827f66s",
            value: "16:00",
          },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <SelectTimeSlotProvider>
        <Story />
      </SelectTimeSlotProvider>
    ),
  ],
} satisfies Meta<typeof Flow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
