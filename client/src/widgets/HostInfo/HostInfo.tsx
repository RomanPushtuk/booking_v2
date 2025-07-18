import { Card, Stack, Text, useMantineTheme } from "@mantine/core";

import { ShortHostInfo } from "../ShortHostInfo";
import { TimeList } from "../TimeList";

import type { ITimeItem } from "../TimeList";

export interface IHostInfoProps {
  name: string;
  description?: string;
  avatarSrc?: string;
  list?: ITimeItem[];
}

const HostInfo = (props: IHostInfoProps) => {
  const { name, description, avatarSrc, list } = props;
  const theme = useMantineTheme();
  return (
    <Card withBorder shadow={theme.shadows.sm}>
      <Stack>
        <ShortHostInfo
          name={name}
          description={description}
          avatarSrc={avatarSrc}
        />
        <Stack gap={6}>
          <Text size={theme.fontSizes.sm} lh={theme.lineHeights.xs} fw={200}>
            The nearest slots for today
          </Text>
          <TimeList list={list} />
        </Stack>
      </Stack>
    </Card>
  );
};

export { HostInfo };
