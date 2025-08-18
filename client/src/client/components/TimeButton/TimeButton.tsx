import { Button, useMantineTheme } from "@mantine/core";
import { useBooking } from "../../contexts";
import { useCallback } from "react";

interface ITimeButtonProps {
  slotId: string;
  value: string;
}

const TimeButton = (props: ITimeButtonProps) => {
  const { value, slotId } = props;
  const { slotId: selectedSlotId, selectSlotId } = useBooking();
  const theme = useMantineTheme();

  const isSelected = slotId === selectedSlotId;

  const handleClick = useCallback(() => {
    selectSlotId(slotId);
  }, [selectSlotId, slotId]);

  return (
    <Button
      variant="filled"
      radius={theme.radius.xl}
      color={isSelected ? theme.colors.orange[9] : undefined}
      onClick={handleClick}
    >
      {value}
    </Button>
  );
};

export { TimeButton };
