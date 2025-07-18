import {
  createContext,
  useCallback,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";

interface ISelectTimeSlotContext {
  slotId: string | null;
  selectSlotId: (slotId: string) => void;
}

const SelectTimeSlotContext = createContext<ISelectTimeSlotContext | null>(
  null,
);

const SelectTimeSlotProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [slotId, setSlotId] = useState<string | null>(null);

  const selectSlotId = useCallback((slotId: string) => {
    setSlotId((prev) => {
      if (prev === slotId) return null;
      return slotId;
    });
  }, []);

  return (
    <SelectTimeSlotContext value={{ slotId, selectSlotId }}>
      {children}
    </SelectTimeSlotContext>
  );
};

const useBooking = (): ISelectTimeSlotContext => {
  const context = useContext(SelectTimeSlotContext);
  if (!context) throw new Error();
  const { slotId, selectSlotId } = context;

  return {
    slotId,
    selectSlotId,
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export { useBooking, SelectTimeSlotProvider };
