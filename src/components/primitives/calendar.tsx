import React, { ChangeEvent } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export type FormControlProps = {
  fromControlName: string;
  forwardRef: React.RefObject<HTMLInputElement>;
  className?: string;
  range?: boolean | undefined;
  onDatePick: (value: string) => void;
};

export default function PrimitiveCalendar(props: FormControlProps) {
  const { fromControlName, forwardRef, className, range, onDatePick } = props;

  const formatDate = (date: Date) => {
    if (!date) {
      return '';
    }

    return `${prefixDateWithZero(date.getDate())}/${prefixDateWithZero(
      date.getMonth() + 1
    )}/${date.getFullYear()}`;
  };

  const onDateChange = (
    value: Date,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    event.stopPropagation();
    onDatePick(formatDate(value));
  };

  const onRangeChange = (
    values: [Date] | [Date, Date],
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const dateString = values
      .map((date: Date) => {
        return formatDate(date);
      })
      .join(' - ');
    onDatePick(dateString);
  };

  return (
    <Calendar
      onChange={range ? onRangeChange : onDateChange}
      selectRange={range}
    />
  );
}

function prefixDateWithZero(value: number): string {
  return value < 10 ? `0${value}` : value.toString();
}
