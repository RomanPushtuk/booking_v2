import { Group } from "@mantine/core";

import { TimeButton } from "../TimeButton";

export interface ITimeItem {
  slotId: string;
  value: string;
}

interface ITimeListProps {
  list?: ITimeItem[];
}

const TimeList = (props: ITimeListProps) => {
  const { list = [] } = props;

  return (
    <Group>
      {list.map((item) => (
        <TimeButton key={item.slotId} value={item.value} slotId={item.slotId} />
      ))}
    </Group>
  );
};

export { TimeList };
