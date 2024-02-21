import {
  TextInput,
  ActionIcon,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

interface SearchComponents {
  searchValue: string;
  setSearchValue: any;
}

export const CustomSearchBar: React.FC<SearchComponents> = ({
  searchValue,
  setSearchValue,
}) => {
  const theme = useMantineTheme();

  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Search questions"
      rightSectionWidth={42}
      leftSection={
        <IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color={theme.primaryColor}
          variant="filled"
        >
          <IconArrowRight
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        </ActionIcon>
      }
      value={searchValue}
      onChange={(delta) => {
        setSearchValue(delta.target.value);
      }}
    />
  );
};