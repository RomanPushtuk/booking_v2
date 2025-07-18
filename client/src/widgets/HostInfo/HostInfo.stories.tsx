import type { Meta, StoryObj } from "@storybook/react-vite";

import { HostInfo } from "./HostInfo";
import { SelectTimeSlotProvider } from "../../contexts";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Widgets/HostInfo",
  component: HostInfo,
  args: {
    name: "Host",
    description: "Super Host Specialist",
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
  decorators: [
    (Story) => (
      <SelectTimeSlotProvider>
        <Story />
      </SelectTimeSlotProvider>
    ),
  ],
} satisfies Meta<typeof HostInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
