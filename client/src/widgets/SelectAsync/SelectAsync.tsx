import { Combobox, Input, InputBase, Loader, useCombobox } from "@mantine/core";
import type { UseQueryResult } from "@tanstack/react-query";

interface ISelectAsyncProps {
  label?: string;
  placeholder?: string;
  withAsterisk?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  query: UseQueryResult<unknown, unknown>,
}

const SelectAsync = (props: ISelectAsyncProps) => {
  const { label, placeholder, withAsterisk, value, onChange, query } = props;
  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<ComboboxItem[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const data = (query.isSuccess ? query.data : []) as { id: string }[]

  // useEffect(() => {
  //   setLoading(true);
  //   fetchFn().then((response) => {
  //     setData(response);
  //     setLoading(false);
  //   });
  // }, [fetchFn]);

  const options = data.map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      {item.id}
    </Combobox.Option>
  ));

  const initValue = data.find((item) => item.id === value)?.id;

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        if (onChange) onChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          label={label}
          component="button"
          type="button"
          pointer
          rightSection={query.isFetching ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          withAsterisk={withAsterisk}
        >
          {initValue || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {query.isFetching ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export { SelectAsync };
