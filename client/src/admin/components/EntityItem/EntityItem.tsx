import { type ReactNode } from "react";
import { ActionIcon, Card, Group, Stack, useMantineTheme } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface INearestBooking {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  onDeleteClick?: () => void;
  deleteIcon?: ReactNode;
  onDetailsClick?: () => void;
  detailsIcon?: ReactNode;
}

const EntityItem = (props: INearestBooking) => {
  const {
    icon,
    title,
    description,
    onDeleteClick,
    deleteIcon,
    onDetailsClick,
    detailsIcon,
  } = props;
  const theme = useMantineTheme();

  return (
    <Card withBorder shadow={theme.shadows.sm}>
      <Group align={"center"}>
        {!!icon && (
          <ActionIcon
            variant="subtle"
            size="xl"
            style={{ pointerEvents: "none" }}
          >
            {icon}
          </ActionIcon>
        )}
        <Stack flex={1}>
          {title}
          {description}
        </Stack>
        {!!onDeleteClick && (
          <ActionIcon size="xl" variant="default" onClick={onDeleteClick}>
            {deleteIcon || <IconTrash stroke={1.5} color="red" />}
          </ActionIcon>
        )}
        {!!onDetailsClick && (
          <ActionIcon size="xl" onClick={onDetailsClick}>
            {detailsIcon || <IconPencil stroke={1.5} />}
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
};

export { EntityItem };
