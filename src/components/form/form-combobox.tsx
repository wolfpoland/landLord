import React, { useEffect, useState } from 'react';

import {
  FloatingPortal,
  autoUpdate,
  offset,
  useFloating,
} from '@floating-ui/react';
import { Combobox } from '@headlessui/react';

export type FormComboboxItem = {
  key: string;
  value: string;
};

export type FormComboboxProps = {
  label?: string;
  forwardRef?: React.RefObject<HTMLInputElement>;
  items: FormComboboxItem[];
  onComboboxChange?: (query: string) => void;
  onComboBoxOptionClick?: (id: string) => void;
};

export default function FormCombobox(props: FormComboboxProps) {
  const { label, forwardRef, items, onComboboxChange, onComboBoxOptionClick } =
    props;
  const [open, setOpen] = useState(true);
  const [query, setQuery] = useState('');

  const { x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [offset(10)],
  });

  const filteredItems =
    query === ''
      ? items
      : items.filter((item: FormComboboxItem) => {
          return item.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox onChange={onComboboxChange}>
      <div className="form-control w-full max-w-md">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <Combobox.Button>
          <Combobox.Input
            ref={reference}
            onChange={(event) => setQuery(event.target.value)}
            className="select w-full max-w-md"
            placeholder="Type or select an option"
          />
        </Combobox.Button>
        <label className="label">
          <span className="label-text-alt">Alt label</span>
        </label>
      </div>
      <FloatingPortal>
        <Combobox.Options
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
          }}
          className="max-w-md w-full rounded-md bg-base-100 text-base shadow-lg">
          {filteredItems.map((item: FormComboboxItem) => (
            <Combobox.Option
              onClick={() =>
                onComboBoxOptionClick && onComboBoxOptionClick(item.key)
              }
              className="cursor-default select-none py-2 pl-5 pr-4 hover:bg-primary-focus"
              key={item.key}
              value={item.value}>
              {item.value}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </FloatingPortal>
    </Combobox>
  );
}
