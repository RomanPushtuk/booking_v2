import { Stack, Container, Dialog, Button, Affix } from "@mantine/core";
import { useBooking } from "../../contexts";
import { HostInfo } from "../HostInfo";
import type { IHostInfoProps } from "../HostInfo/HostInfo";
import { useCallback } from "react";

interface IFlowProps {
  list: IHostInfoProps[];
}

export const Flow = (props: IFlowProps) => {
  const { list } = props;
  const { slotId } = useBooking();

  const isSlotSelected = Boolean(slotId);

  const handleConfirm = useCallback(() => {}, []);

  return (
    <>
      <Container size={680} mb="64px">
        <Stack>
          {list.map((item, index) => (
            <HostInfo
              key={index}
              name={item.name}
              description={item.description}
              list={item.list}
            />
          ))}
        </Stack>
      </Container>
      <Dialog opened={isSlotSelected} display={"none"}>
        <Affix
          position={{ bottom: 32, left: "50%" }}
          style={{ transform: "translate(-50%, 0)" }}
        >
          <Button size="lg" fullWidth px="48px" onClick={handleConfirm}>
            Confirm
          </Button>
        </Affix>
      </Dialog>
    </>
  );
};
