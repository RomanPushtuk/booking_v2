import { Box, Button, Flex, Text, useMantineTheme } from "@mantine/core";
import type { ReactNode, PropsWithChildren } from "react";

interface ISectionProps {
  title?: ReactNode;
  actionText?: ReactNode;
  onActionClick?: () => void;
}

const Section = (props: PropsWithChildren<ISectionProps>) => {
  const { title, actionText, onActionClick, children } = props;
  const theme = useMantineTheme();
  return (
    <>
      <Text size="32px" mb={theme.spacing.md} fw={700}>
        {title}
      </Text>
      <Box mb={theme.spacing.md}>{children}</Box>
      {!!actionText && (
        <Flex direction="row-reverse">
          <Button size="lg" onClick={onActionClick}>
            {actionText}
          </Button>
        </Flex>
      )}
    </>
  );
};

export { Section };
