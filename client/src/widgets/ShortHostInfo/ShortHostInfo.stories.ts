import type { Meta, StoryObj } from "@storybook/react-vite";

import { ShortHostInfo } from "./ShortHostInfo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Widgets/ShortHostInfo",
  component: ShortHostInfo,
  args: {
    name: "Host",
    description: "Super Host Specialist",
  },
} satisfies Meta<typeof ShortHostInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
