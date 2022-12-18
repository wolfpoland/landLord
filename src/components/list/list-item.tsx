import React, { MouseEvent } from 'react';

export type ListItemProps = {
  children: JSX.Element[] | JSX.Element;
  trackKey: string;
  className?: string;
  onMouseEnter?: (mouse: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (mouse: MouseEvent<HTMLDivElement>) => void;
  onClick?: (key: string) => void;
};

export default function ListItem(props: ListItemProps) {
  const { children, className, onMouseEnter, onMouseLeave, onClick, trackKey } = props;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick && onClick(trackKey)}
      className={`p-1 px-2 cursor-pointer hover:bg-primary-focus items-center ${className}`}>
      {children}
    </div>
  );
}
