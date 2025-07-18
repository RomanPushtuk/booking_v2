import { Avatar, Box, Flex, Text, useMantineTheme } from "@mantine/core";

interface IShortHostInfoProps {
  name: string;
  description?: string;
  avatarSrc?: string;
}

const ShortHostInfo = (props: IShortHostInfoProps) => {
  const { name, description, avatarSrc } = props;

  const theme = useMantineTheme();

  return (
    <Flex>
      <Avatar src={avatarSrc} alt="host avatar" mr="xs" />
      <Box style={{ flexBasis: "100%" }}>
        <Text size={theme.fontSizes.md} lh={theme.lineHeights.sm} fw={400}>
          {name}
        </Text>
        {!!description && (
          <Text
            size={theme.fontSizes.sm}
            lh={theme.lineHeights.xs}
            c={theme.colors.gray[6]}
            fw={400}
          >
            {description}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export { ShortHostInfo };
