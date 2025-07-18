import { ActionIcon, Affix, Dialog, Flex } from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons-react";
import type { PropsWithChildren } from "react";

interface IFooterProps {
  onBack?: () => void;
}

const Footer = (props: PropsWithChildren<IFooterProps>) => {
  const { children, onBack } = props;
  return (
    <Dialog opened display="none">
      <Affix
        position={{ bottom: 32, left: "50%" }}
        style={{ transform: "translate(-50%, 0)" }}
      >
        <Flex w="100vw" px="md" align="center">
          {!!onBack && (
            <ActionIcon size="xl" radius="xl" onClick={onBack}>
              <IconChevronLeft />
            </ActionIcon>
          )}
          {children}
        </Flex>
      </Affix>
    </Dialog>
  );
};

export { Footer };
