import { useEffect, useState } from "react";
import { Combobox, Input, InputBase, Loader, useCombobox } from "@mantine/core";
import { type ComboboxItem } from "@mantine/core";

interface ISelectAsyncProps {
  label?: string;
  placeholder?: string;
  withAsterisk?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  fetchFn: () => Promise<ComboboxItem[]>;
}

const SelectAsync = (props: ISelectAsyncProps) => {
  const { label, placeholder, withAsterisk, value, fetchFn, onChange } = props;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ComboboxItem[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    setLoading(true);
    fetchFn().then((response) => {
      setData(response);
      setLoading(false);
    });
  }, [fetchFn]);

  const options = data.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  const initValue = data.find((item) => item.value === value)?.label;

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
          rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          withAsterisk={withAsterisk}
        >
          {initValue || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {loading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export { SelectAsync };
