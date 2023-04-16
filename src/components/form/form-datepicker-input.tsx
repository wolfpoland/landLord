import PrimitiveCalendar from '../primitives/calendar';

import React, { FocusEvent, ReactElement, useState } from 'react';
import 'react-calendar/dist/Calendar.css';

import {
  FloatingPortal,
  autoUpdate,
  offset,
  useFloating,
} from '@floating-ui/react';

export type FormControlProps = {
  fromControlName: string;
  forwardRef: React.RefObject<HTMLInputElement>;
  className?: string;
  range?: boolean;
};

export default function FormDatepickerInput(props: FormControlProps) {
  const { fromControlName, forwardRef, className, range } = props;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  let calendarElement: ReactElement | null = null;

  const { x, y, reference, floating, strategy } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom',
    whileElementsMounted: autoUpdate,
    middleware: [offset(10)],
  });

  const onInputClick = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setOpen(true);
  };

  const onDatePick = (value: string): void => {
    setValue(value);
    setOpen(false);
  };

  const onInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!event.relatedTarget?.closest('.react-calendar')) {
      setOpen(false);
    }
  };

  if (open) {
    calendarElement = (
      <div
        ref={floating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
        }}
        className="bg-accent-content">
        <PrimitiveCalendar
          forwardRef={forwardRef}
          fromControlName={fromControlName}
          onDatePick={onDatePick}
          range={range}
        />
      </div>
    );
  }

  return (
    <div className={`form-control w-full max-w-md ${className}`}>
      <label className="label">
        <span className="label-text">{fromControlName}</span>
      </label>
      <input
        ref={reference}
        onClick={onInputClick}
        onBlur={onInputBlur}
        defaultValue={value}
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-md"
      />

      <FloatingPortal>{calendarElement}</FloatingPortal>
      <label className="label">
        <span className="label-text-alt">Alt label</span>
      </label>
    </div>
  );
}
