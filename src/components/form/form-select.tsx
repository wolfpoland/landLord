import React, { useState } from 'react';

import {
  FloatingPortal,
  autoUpdate,
  offset,
  useFloating,
} from '@floating-ui/react';
import { Combobox, Listbox } from '@headlessui/react';

export type FormSelectItem = {
  key: string;
  value: string;
};

export type FormSelectProps = {
  label?: string;
  forwardRef?: React.RefObject<HTMLInputElement>;
  items: FormSelectItem[];
};

export default function FormSelect(props: FormSelectProps) {
  const { label, forwardRef, items } = props;
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  const { x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [offset(10)],
  });

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="form-control w-full w-40">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <Listbox.Button
          ref={reference}
          className="select  w-full cursor-default text-left py-2 pl-3 pr-10">
          <span className="block truncate">{selected || 'Pick an option'}</span>
        </Listbox.Button>
        <label className="label">
          <span className="label-text-alt">Alt label</span>
        </label>
      </div>
      <FloatingPortal>
        <Listbox.Options
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className="w-40 w-full rounded-md bg-base-100 text-base shadow-lg">
          {items.map((item: FormSelectItem) => (
            <Listbox.Option
              className="cursor-default select-none py-2 pl-5 pr-4 hover:bg-primary-focus"
              key={item.key}
              value={item.value}>
              {item.value}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </FloatingPortal>
    </Listbox>
  );
}
