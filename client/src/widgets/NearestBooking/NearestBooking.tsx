import {
  ActionIcon,
  Card,
  Flex,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { ShortHostInfo } from "../ShortHostInfo";
import { useNavigate } from "react-router";
import { useCallback } from "react";

interface INearestBooking {
  id: string;
  name: string;
  description?: string;
  avatarSrc?: string;
  date: string;
  time: string;
  onDetailsClick?: () => void;
}

const NearestBooking = (props: INearestBooking) => {
  const { name, description, avatarSrc, date, time } = props;
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const handleDetaisClick = useCallback(() => {
    navigate("/details");
  }, [navigate]);

  return (
    <Card withBorder shadow={theme.shadows.sm}>
      <Flex align={"center"}>
        <Stack flex={1}>
          <ShortHostInfo
            name={name}
            description={description}
            avatarSrc={avatarSrc}
          />
          <Text>
            {date} {time}
          </Text>
        </Stack>
        <ActionIcon size="xl" onClick={handleDetaisClick}>
          <IconChevronRight />
        </ActionIcon>
      </Flex>
    </Card>
  );
};

export { NearestBooking };
